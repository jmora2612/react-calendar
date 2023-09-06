import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "Cumple jefe",
//   notes: "prueba de notas",
//   start: new Date(),
//   end: addHours(new Date(), 1),
//   bgColor: "#fafafa",
//   user: {
//     _id: "123",
//     name: "Jessi",
//   }
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    activentEvent: null,
    isLoadingEvent: true,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activentEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activentEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((el) => {
        if (el._id === payload._id) return payload;
        return el;
      });
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter(
        (el) => state.activentEvent._id !== el._id
      );
      state.activentEvent = null;
    },
    onLoadEvent: (state, { payload }) => {
      state.isLoadingEvent = false;
      payload.forEach((element) => {
        const exist = state.events.some(
          (dbEvent) => dbEvent._id === element._id
        );
        if (!exist) {
          state.events.push(element);
        }
      });
    },
    onLogoutCalendar: (state) => {
      (state.events = []),
        (state.activentEvent = null),
        (state.isLoadingEvent = true);
    },
    onCloseCalendarModal: (state) => {
      state.activentEvent = null;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvent,
  onLogoutCalendar,
  onCloseCalendarModal,
} = calendarSlice.actions;
