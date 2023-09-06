import { useCalendarStore } from "../../hooks";
import Swal from "sweetalert2";

export const FabDelete = () => {
  const { events, activentEvent, startDeleteEvent } = useCalendarStore();

  const handleDelete = async () => {
    const { data } = await startDeleteEvent();
    if (data.deletedCount >= 1) {
      Swal.fire("Evento eliminado", 'Evento eliminado satisfactoriamente', "success");
      return;
    }
  };

  return (
    <>
      {events.length > 0 && (
        <button
          className="btn btn-danger fab-danger"
          onClick={handleDelete}
          disabled={!activentEvent}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      )}
    </>
  );
};
