import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../src/hooks/useAuthStore");

//esto es un mock de un componente, ya que el AppRouter
//al intentar renderizar la ruta del CalendarPage, el mock entra
//y en vez de renderizar funciones, conexiones, renderiza el h1
//ya que sino nos daria problemas por todas las dependencias
jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));
describe("pruebas en AppRouter", () => {
  const mockCheckAuthToken = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  test("debe de mostrar el login en caso de no estar autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    <MemoryRouter>
      <AppRouter />
    </MemoryRouter>;
    expect(document.body.innerHTML).toBe("");
  });

    test("debe de mostrar el calendario si estamos autenticados", () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect( screen.getByText('CalendarPage') ).toBeTruthy();
    });
});
