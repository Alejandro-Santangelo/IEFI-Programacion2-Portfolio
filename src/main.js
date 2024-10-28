"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const portfolio_1 = require("./portfolio");
const portfolio = new portfolio_1.Portfolio();
portfolio.cargarDesdeArchivo(); // Cargar personas desde archivo al iniciar
// Ejemplo de agregar una persona
const nuevaPersona = {
    dni: '12345678',
    nombre: 'Juan',
    apellido: 'Pérez',
    habilidades: [{ nombre: 'JavaScript', nivel: 'Avanzado' }],
    estudios: [{ titulo: 'Ingeniería en Sistemas', institucion: 'Universidad ABC', anio: 2020 }],
    experiencias: [{ puesto: 'Desarrollador', empresa: 'Empresa X', anioInicio: 2021, anioFin: 2023 }],
    expectativas: [{ descripcion: 'Buscar un puesto desafiante en desarrollo web.', salarioEsperado: 50000 }]
};
portfolio.agregarPersona(nuevaPersona);
// Listar personas
console.log(portfolio.listarPersonas());
// Borrar persona por DNI
portfolio.borrarPersona('12345678');
