import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvent,
  onCloseCalendarModal,
} from "../store";
import { calendarApi } from "../api";
import { parseISO } from "date-fns";
import Swal from "sweetalert2";
import { useState } from "react";

export const useCalendarStore = () => {
  const { events, activentEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const [resetForm, setResetForm] = useState(false);

  const dispatch = useDispatch();
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };
  const userId = user._id;
  const startSavingEvent = async (calendarEvent) => {
    try {
      const { title, notes, start, end } = calendarEvent;

      if (calendarEvent._id) {
        const id = calendarEvent._id;
        const update = {
          title: calendarEvent.title,
          notes: calendarEvent.notes,
          start: calendarEvent.start,
          end: calendarEvent.end,
        };
        await calendarApi.put(`/calendario-event/${id}`, update);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      const { data } = await calendarApi.post("/calendario-event", {
        title,
        notes,
        start,
        end,
        user: userId,
      });

      dispatch(onAddNewEvent({ ...calendarEvent, _id: data.data._id, user }));
    } catch ({ response }) {
      return response.data.message;
    }
  };

  const startDeleteEvent = async () => {
    try {
      const { data } = await calendarApi.delete(
        `/calendario-event/${activentEvent._id}`
      );
      dispatch(onDeleteEvent());
      dispatch(onCloseCalendarModal())
      return data;
    } catch (error) {
      Swal.fire("Error", "Error al eliminar el evento", "error");
    }
  };

  const startLoadingEvent = async () => {
    try {
      const { data } = await calendarApi.get(`/calendarios-event/${userId}`);
      const CalendarEvents = data.data.map((el) => {
        el.start = parseISO(el.start);
        el.end = parseISO(el.end);
        return el;
      });
      dispatch(onLoadEvent(CalendarEvents));
    } catch (error) {
      console.log(error);
    }
  };

  const startCloseCalendarModal = () => {
    dispatch(onCloseCalendarModal())
  };

  return {
    //propiedades
    events,
    activentEvent,
    resetForm,
    //Metodos
    setResetForm,
    startLoadingEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startCloseCalendarModal
  };
};
