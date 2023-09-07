import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import {
  authenticatedTest,
  initialState,
  notAuthenticated,
} from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("pruebas en useAuthStore", () => {
  beforeEach(() => localStorage.clear());
  test("debe devolver los valores por defecto", () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test("startLogin debe realizar el onLogin", async () => {
    const mockStore = getMockStore({ ...notAuthenticated });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual(authenticatedTest);
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
  });

  test("startLogin debe de fallar la autenticacion", async () => {
    const mockStore = getMockStore({ ...notAuthenticated });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "aaa@gmail.com",
        password: "111",
      });
    });

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: expect.any(String),
    });
    expect(localStorage.getItem("token")).toBe(null);
    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test("debe de ejecutar startRegister", async () => {
    const mockStore = getMockStore({ ...notAuthenticated });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        status: "success",
        data: {
          _id: "123456",
          name: "Test-user",
          token: "ALGUN-TOKEN",
        },
        message: "Usuario creado de forma exitosa.",
      },
    });

    await act(async () => {
      await result.current.startRegister({
        email: "prueba111@gmail.com",
        password: "123456",
        name: "prueba111",
      });
    });

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: "authenticated",
      user: { _id: "123456", name: "Test-user" },
      errorMessage: undefined,
    });
    spy.mockRestore();
  });

  test("debe de fallar startRegister", async () => {
    const mockStore = getMockStore({ ...notAuthenticated });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: expect.any(String),
    });
  });

  test("debe de fallar checkAuthToken si no hay token", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("debe ejecutar checkAuthToken si hay token", async () => {
    const { email, password } = testUserCredentials;
    const { data: res } = await calendarApi.post("/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      status: "authenticated",
      user: { name: "test", _id: "64f8c524f1034d8a4789b4c5" },
      errorMessage: undefined,
    });
  });

  test("debe ejecutar checkAuthToken si hay token", () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.startLogout();
    });
    const { status, user, errorMessage } = result.current;
    expect(localStorage.getItem('token')).toBe(null)
    expect({ status, user, errorMessage }).toEqual(initialState)
    
  });
});
