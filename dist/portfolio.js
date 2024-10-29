"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Portfolio {
    constructor(archivoManager) {
        this.archivoManager = archivoManager; // Inicializa el archivo manager
        this.personas = this.archivoManager.cargar(); // Cargar datos al iniciar
    }
    // Método para agregar una persona
    agregarPersona(persona) {
        this.personas.push(persona);
        this.archivoManager.guardar(this.personas); // Guardar cambios en el archivo
    }
    // Método para modificar una persona existente
    modificarPersona(dni, nuevosDatos) {
        const index = this.personas.findIndex(persona => persona.dni === dni);
        if (index !== -1) {
            // Actualiza los atributos de la persona
            this.personas[index] = Object.assign(Object.assign({}, this.personas[index]), nuevosDatos);
            this.archivoManager.guardar(this.personas); // Guardar cambios en el archivo
            return true; // Persona modificada
        }
        return false; // Persona no encontrada
    }
    // Método para borrar una persona por DNI
    borrarPersona(dni) {
        const index = this.personas.findIndex(persona => persona.dni === dni);
        if (index !== -1) {
            this.personas.splice(index, 1);
            this.archivoManager.guardar(this.personas); // Guardar cambios en el archivo
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
                console.log(`DNI: ${persona.dni}`);
                console.log(`Nombre: ${persona.nombre}`);
                console.log(`Habilidades: ${persona.habilidades.join(", ")}`);
                console.log(`Estudios: ${persona.estudios.join(", ")}`);
                console.log(`Experiencias: ${persona.experiencias.join(", ")}`);
                console.log(`Expectativas: ${persona.expectativas.join(", ")}`);
                console.log('------------------------'); // Línea separadora para mejor legibilidad
            });
        }
    }
    // Método para buscar una persona por DNI
    buscarPersonaPorDNI(dni) {
        return this.personas.find(persona => persona.dni === dni);
    }
    // Método para obtener los detalles de una persona por DNI
    obtenerPersonaPorDNI(dni) {
        const persona = this.buscarPersonaPorDNI(dni);
        return persona; // Devuelve la persona si se encuentra
    }
    // Método para mostrar los detalles de una persona por DNI
    mostrarPersonaPorDNI(dni) {
        const persona = this.obtenerPersonaPorDNI(dni);
        if (persona) {
            console.log(`Detalles de la persona con DNI ${dni}:`);
            console.log(`Nombre: ${persona.nombre}`);
            console.log(`Habilidades: ${persona.habilidades.join(", ")}`);
            console.log(`Estudios: ${persona.estudios.join(", ")}`);
            console.log(`Experiencias: ${persona.experiencias.join(", ")}`);
            console.log(`Expectativas: ${persona.expectativas.join(", ")}`);
        }
        else {
            console.log(`No se encontró una persona con DNI ${dni}.`);
        }
    }
}
exports.default = Portfolio;
