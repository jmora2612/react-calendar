import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { events, activentEvent, startDeleteEvent } = useCalendarStore();

  const handleDelete = () => {
    startDeleteEvent();
  };

  return (
    <>
      {events.length > 0 && (
        <button className="btn btn-danger fab-danger" onClick={handleDelete} disabled={!activentEvent}>
          <i className="fas fa-trash-alt"></i>
        </button>
      )}
    </>
  );
};
