import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvent,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

describe("pruebas en calendarSlice", () => {
  test("debe de traer el initialState", () => {
    expect(calendarSlice.getInitialState()).toEqual(initialState);
  });

  test("debe de activar el evento onSetActiveEvent", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state).toEqual(calendarWithActiveEventState);
  });

  test("debe de insertar un nuevo evento onAddNewEvent", () => {
    const newEvent = {
      _id: 2,
      title: "Cumple 2",
      notes: "prueba de notas2",
      start: new Date("2023-09-08 13:00:00"),
      end: new Date("2023-09-08 14:00:00"),
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    expect(state.events).toEqual([...events, newEvent]);
  });

  test("debe de actualizar un nuevo evento onUpdateEvent", () => {
    const updateEvent = {
      _id: 1,
      title: "Cumple 11",
      notes: "prueba de notas11",
      start: new Date("2023-09-07 13:00:00"),
      end: new Date("2023-09-07 14:00:00"),
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updateEvent)
    );

    // expect(state.events).toContain(updateEvent);
    expect(state.events).toEqual(
      events.map((el) => {
        if (el._id === updateEvent._id) return updateEvent;
        return el;
      })
    );
  });

  test("onDeleteEvent", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.events).not.toContain(events[0]);
  });

  test("onLoadEvent", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvent(events));
    expect(state).toEqual(calendarWithEventsState);
  });

  test("onLogoutCalendar", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
