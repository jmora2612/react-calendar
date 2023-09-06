import calendarApi from "../../src/api/calendarApi"

describe('pruebas en calendarApi', () => { 
    test('debe de tener la configuracion por defecto', () => { 
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
     });

     test('debe de tener el token del header en todas las peticiones', async() => { 
        localStorage.setItem('token', 'ABC-123-DFG');
        const token = 'Bearer ABC-123-DFG'
        const res = await calendarApi.get('/usuarios')
        expect(res.config.headers.Authorization).toBe(token)

     })
 })