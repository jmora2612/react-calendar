import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks";
registerLocale("es", es);

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const {
    activentEvent,
    startSavingEvent,
    startCloseCalendarModal,
    resetForm,
    setResetForm,
    events
  } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleValid = useMemo(() => {
    if (!formSubmitted) return "";
    return !formValues.title ? "is-invalid" : "";
  }, [formValues.title, formSubmitted]);

  const notesValid = useMemo(() => {
    if (!formSubmitted) return "";
    return !formValues.notes ? "is-invalid" : "";
  }, [formValues.notes, formSubmitted]);

  useEffect(() => {
    if (activentEvent) {
      setFormValues({ ...activentEvent });
    }
  }, [activentEvent]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  Modal.setAppElement("#root");

  const onCloseModal = () => {
    if (activentEvent) {
      startCloseCalendarModal();
      setResetForm(true)
    }
    closeDateModal();
  };

  useEffect(() => {
    setFormValues({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 1),
    });
    setResetForm(false);
  }, [resetForm, events]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire(
        "Fechas incorrectas",
        "Debe revisar las fechas ingresadas",
        "error"
      );
      return;
    }

    if (!formValues.title || !formValues.notes) return;
    const prueba = await startSavingEvent(formValues);
    if (prueba) {
      Swal.fire("Error en la autenticacion", prueba, "error");
      return;
    }
    setFormSubmitted(false);
    closeDateModal();
    formValues._id
      ? Swal.fire(
          "Nota actualizada",
          "Nota actualizada correctamente",
          "success"
        )
      : Swal.fire("Nota creada", "Nota creada correctamente", "success");
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      {activentEvent ? <h1> Actualizar evento </h1> : <h1> Nuevo evento </h1>}
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label style={{ marginBottom: "10px" }}>Fecha y hora inicio</label>
          <br />
          <DatePicker
            minDate={new Date()}
            className="form-control"
            selected={formValues.start}
            onChange={(event) => onDateChange(event, "start")}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
            dateFormat="Pp"
          />
        </div>

        <div className="form-group mb-2">
          <label style={{ marginBottom: "10px" }}>Fecha y hora fin</label>
          <br />
          <DatePicker
            minDate={formValues.start}
            className="form-control"
            selected={formValues.end}
            onChange={(event) => onDateChange(event, "end")}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
            dateFormat="Pp"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo</label>
          <input
            style={{ marginTop: "10px" }}
            type="text"
            className={`form-control ${titleValid}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            onChange={onInputChange}
            value={formValues.title}
          />
          {formSubmitted && !formValues.title ? (
            <>
              <small className="form-text" style={{ color: "red" }}>
                Debe ingresar un titulo
              </small>
              <br />
            </>
          ) : (
            ""
          )}
        </div>

        <div className="form-group mb-2">
          <label>Nota</label>
          <textarea
            style={{ marginTop: "10px" }}
            type="text"
            className={`form-control ${notesValid}`}
            placeholder="Notas"
            rows="5"
            name="notes"
            onChange={onInputChange}
            value={formValues.notes}
          ></textarea>
          {formSubmitted && !formValues.notes ? (
            <>
              <small className="form-text" style={{ color: "red" }}>
                Debe ingresar una nota
              </small>
              <br />
            </>
          ) : (
            ""
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "30px",
          }}
        >
          <button type="submit" className="btn btn-outline-primary">
            <i className="far fa-save"></i>
            {activentEvent ? (
              <span style={{ marginLeft: "5px" }}>Actualizar</span>
            ) : (
              <span style={{ marginLeft: "5px" }}>Guardar</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
