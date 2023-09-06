// En caso de necesitar la implementación del FetchAPI
// yarn add -D whatwg-fetch
// import 'whatwg-fetch'; 

// En caso de encontrar paquetes que lo requieran 
// yarn add -D setimmediate
// import 'setimmediate';

// En caso de tener variables de entorno y aún no soporta el import.meta.env
require('dotenv').config({
    path: '.env.test'
});

// Realizar el mock completo de las variables de entorno
jest.mock('./src/helpers/getEnv', () => ({
    getEnv: () => ({ ...process.env })
}));