import {
  authSlice,
  onCheking,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import {
  authenticated,
  initialState,
  messages,
} from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("pruebas en authSlice", () => {
  test("debe de regresar el estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("debe de autenticar", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("debe realizar logout", () => {
    const state = authSlice.reducer(authenticated, onLogout());
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("debe de limpiar los mensajes", () => {
    const state = authSlice.reducer(
      authenticated,
      onLogout("mensaje de error")
    );
    const clearState = authSlice.reducer(state, onClearErrorMessage());
    expect(clearState.errorMessage).toBe(undefined);
  });

  test("debe realizar onCheking", () => {
    const state = authSlice.reducer(authenticated, onCheking());
    expect(state).toEqual({
      status: "checking",
      user: {},
      errorMessage: undefined,
    });
  });
});
