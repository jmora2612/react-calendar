export const events = [{
  _id: 0,
  title: "Cumple jefe",
  notes: "prueba de notas",
  start: new Date('2023-09-06 13:00:00'),
  end: new Date('2023-09-06 14:00:00'),
},
{
    _id: 1,
    title: "Cumple 1",
    notes: "prueba de notas1",
    start: new Date('2023-09-07 13:00:00'),
    end: new Date('2023-09-07 14:00:00'),
  }
]

export const initialState ={
    events: [],
    activentEvent: null,
    isLoadingEvent: true,
}


export const calendarWithEventsState ={
    events: [...events],
    activentEvent: null,
    isLoadingEvent: false,
}


export const calendarWithActiveEventState ={
    events: [...events],
    activentEvent: {...events[0]},
    isLoadingEvent: false,
}

