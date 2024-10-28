"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// portfolio.ts
const fs = require("fs");
class Portfolio {
    constructor() {
        this.personas = [];
        this.cargarDesdeArchivo(); // Cargar datos al iniciar
    }
    // Método para cargar personas desde un archivo JSON
    cargarDesdeArchivo() {
        try {
            if (!fs.existsSync('portfolio.json')) {
                fs.writeFileSync('portfolio.json', JSON.stringify([], null, 2)); // Crear el archivo si no existe
            }
            const data = fs.readFileSync('portfolio.json', 'utf-8');
            this.personas = JSON.parse(data);
        }
        catch (error) {
            console.error('Error al cargar datos desde el archivo:', error);
        }
    }
    // Método para guardar personas en un archivo JSON
    guardarEnArchivo() {
        fs.writeFileSync('portfolio.json', JSON.stringify(this.personas, null, 2));
    }
    // Método para agregar una persona
    agregarPersona(persona) {
        this.personas.push(persona);
        this.guardarEnArchivo(); // Guardar cambios en el archivo
    }
    // Método para borrar una persona por DNI
    borrarPersona(dni) {
        const index = this.personas.findIndex(persona => persona.dni === dni);
        if (index !== -1) {
            this.personas.splice(index, 1);
            this.guardarEnArchivo(); // Guardar cambios en el archivo
            return true; // Persona borrada
        }
        return false; // Persona no encontrada
    }
    // Método para listar personas
    listarPersonas() {
        console.log("Listado de personas:");
        if (this.personas.length === 0) {
            console.log("No hay personas en el portafolio.");
        }
        else {
            this.personas.forEach(persona => {
                console.log(`DNI: ${persona.dni}, Nombre: ${persona.nombre}`);
            });
        }
    }
    // Método para buscar una persona por DNI
    buscarPersonaPorDNI(dni) {
        return this.personas.find(persona => persona.dni === dni);
    }
}
exports.default = Portfolio;
