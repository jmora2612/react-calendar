import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("pruebas uiSlice", () => {
  test("debe de regresar el estado por defecto", () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test("debe de cambiar isDateModalOpen a true", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal);
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal);
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
