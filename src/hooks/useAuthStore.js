import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onCheking, onClearErrorMessage, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onCheking());
    try {
      const { data: result } = await calendarApi.post("/login", {
        email,
        password,
      });
      const { data } = result;
      localStorage.setItem("token", data.token);
      delete data.token;
      dispatch(onLogin(data));
      //
    } catch ({ response }) {
      dispatch(onLogout(response.data.message));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onCheking());
    try {
      const { data: result } = await calendarApi.post("/usuario", {
        name,
        email,
        password,
      });
      const { data } = result;
      localStorage.setItem("token", data.token);
      delete data.token;
      dispatch(onLogin(data));
    } catch ({ response }) {
      dispatch(onLogout(response.data.message));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) dispatch(onLogout());
    try {
      const { data: result } = await calendarApi.get("/token-refresh");
      const { data } = result;
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ _id: data._id, name: data.name }));
    } catch ({ response }) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    //propiedades
    status,
    user,
    errorMessage,

    //metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
