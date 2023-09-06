import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "react-big-calendar";
import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../";
import { localizer, getMessagesES } from "../../helpers";
import { useEffect, useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { useSelector } from "react-redux";

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const { user, startLogout } = useAuthStore();

  const { _id, name } = user;

  const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();

  const { openDateModal } = useUiStore();

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347cf7",
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      height: "40px",
    };
    return { style };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvent()
  }, [])
  

  return (
    <>
      <Navbar name={name} startLogout={startLogout} />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
