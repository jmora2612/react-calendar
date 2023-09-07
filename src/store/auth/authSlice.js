import { createSlice } from "@reduxjs/toolkit";

const objetLocalStorage = JSON.parse(localStorage.getItem("user"));

let state = "";
let setUser = {};
if (localStorage.getItem("token")) {
  state = "authenticated";
  setUser = {
    _id: objetLocalStorage._id,
    name: objetLocalStorage.name,
  };
} else {
  state = "not-authenticated";
  setUser = {};
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: state, //authenticated, not-authenticated
    user: setUser,
    errorMessage: undefined,
  },
  reducers: {
    onCheking: (state /* action */) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    onClearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});
// Action creators are generated for each case reducer function
export const { onCheking, onLogin, onLogout, onClearErrorMessage } =
  authSlice.actions;
