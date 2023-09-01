import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { calendarSlice } from "./calendar/calendarSlice";

export const store = configureStore({
    reducer:{
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
    //middleware
    //esto es para que las fechas no se revise si se pueden serializar
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
    
    
})
