import { Navigate, Route, Routes } from "react-router-dom";
import { CalendarPage } from "../../calendar";

export const Privada = () => {
  return (
    <Routes>
      <>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </>
    </Routes>
  );
};
