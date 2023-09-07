import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
import { events } from "../../fixtures/calendarStates";

jest.mock("../../../src/hooks/useCalendarStore");

describe("pruebas en FabDelete", () => {
  const mockStartDeleteEvent = jest.fn(async () => ({
    data: { deletedCount: 1 }, // Simula una respuesta válida con deletedCount definido
  }));
  beforeEach(() => jest.clearAllMocks());
  test("renderizar FabDelete", () => {
    useCalendarStore.mockReturnValue({
      events: events,
      activentEvent: events[0],
    });

    render(<FabDelete />);
    //screen.debug();
    const btn = screen.getByLabelText("btn-danger");
    // console.log(btn.classList.toString());
    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("btn-danger");
    expect(btn.classList).toContain("fab-danger");
  });

  test("renderizar FabDelete", async () => {
    useCalendarStore.mockReturnValue({
      events: events,
      activentEvent: events[0],
      startDeleteEvent: mockStartDeleteEvent,
    });

    render(<FabDelete />);
    const btn = screen.getByLabelText("btn-danger");
    fireEvent.click(btn);
    await expect(mockStartDeleteEvent).toHaveBeenCalled();
  });
});
