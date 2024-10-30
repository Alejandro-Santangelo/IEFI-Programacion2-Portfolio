"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Portfolio {
    constructor(archivoManager) {
        this.archivoManager = archivoManager;
        this.personas = this.archivoManager.cargar();
    }
    agregarPersona(persona) {
        this.personas.push(persona);
        this.archivoManager.guardar(this.personas);
    }
    modificarPersona(dni, nuevosDatos) {
        const index = this.personas.findIndex(persona => persona.dni === dni);
        if (index !== -1) {
            this.personas[index] = Object.assign(Object.assign({}, this.personas[index]), nuevosDatos);
            this.archivoManager.guardar(this.personas);
            return true;
        }
        return false;
    }
    borrarPersona(dni) {
        const index = this.personas.findIndex(persona => persona.dni === dni);
        if (index !== -1) {
            this.personas.splice(index, 1);
            this.archivoManager.guardar(this.personas);
            return true;
        }
        return false;
    }
    listarPersonas() {
        console.log("Listado de personas:");
        if (this.personas.length === 0) {
            console.log("No hay personas en el portafolio.");
        }
        else {
            this.personas.forEach(persona => {
                console.log(`DNI: ${persona.dni}`);
                console.log(`Nombre: ${persona.nombre}`);
                console.log(`Apellido: ${persona.apellido}`);
                console.log(`Habilidades: ${persona.habilidades.map(h => h.nombre).join(", ")}`);
                console.log(`Estudios: ${persona.estudios.map(e => e.titulo).join(", ")}`);
                console.log(`Experiencias: ${persona.experiencias.map(e => e.puesto).join(", ")}`);
                console.log(`Expectativas: ${persona.expectativas.map(e => e.descripcion).join(", ")}`);
                console.log('------------------------');
            });
        }
    }
    buscarPersonaPorDNI(dni) {
        return this.personas.find(persona => persona.dni === dni);
    }
    obtenerPersonaPorDNI(dni) {
        return this.buscarPersonaPorDNI(dni);
    }
    mostrarPersonaPorDNI(dni) {
        const persona = this.obtenerPersonaPorDNI(dni);
        if (persona) {
            console.log(`Detalles de la persona con DNI ${dni}:`);
            console.log(`Nombre: ${persona.nombre}`);
            console.log(`Apellido: ${persona.apellido}`);
            console.log(`Habilidades: ${persona.habilidades.map(h => h.nombre).join(", ")}`);
            console.log(`Estudios: ${persona.estudios.map(e => e.titulo).join(", ")}`);
            console.log(`Experiencias: ${persona.experiencias.map(e => e.puesto).join(", ")}`);
            console.log(`Expectativas: ${persona.expectativas.map(e => e.descripcion).join(", ")}`);
        }
        else {
            console.log(`No se encontró una persona con DNI ${dni}.`);
        }
    }
}
exports.default = Portfolio;
