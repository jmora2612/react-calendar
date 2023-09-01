import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from "../store";

export const useCalendarStore = () => {
  const { events, activentEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // Envio de data al back
    calendarEvent._id
      ? dispatch(onUpdateEvent(calendarEvent))
      : dispatch(
          onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })
        );
  };

  const startDeleteEvent = ()=>{
    dispatch(onDeleteEvent())
  }

  return {
    events,
    activentEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent
  };
};
