"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
class UI {
    constructor(portfolio) {
        this.portfolio = portfolio;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.mostrarMenu();
    }
    mostrarMenu() {
        console.log("Opciones:");
        console.log("1. Listar personas");
        console.log("2. Agregar persona");
        console.log("3. Borrar persona");
        console.log("4. Modificar persona");
        console.log("5. Listar persona por DNI"); // Nueva opción
        console.log("6. Salir"); // Actualizar número de opción
        this.rl.question("Elige una opción: ", (opcion) => {
            switch (opcion) {
                case '1':
                    this.portfolio.listarPersonas();
                    break;
                case '2':
                    this.agregarPersona();
                    return;
                case '3':
                    this.borrarPersona();
                    return;
                case '4':
                    this.modificarPersona();
                    return;
                case '5':
                    this.listarPersonaPorDNI(); // Llama al nuevo método
                    return;
                case '6': // Actualizar número de opción
                    this.rl.close();
                    return;
                default:
                    console.log("Opción no válida.");
            }
            this.mostrarMenu();
        });
    }
    agregarPersona() {
        this.rl.question("DNI: ", (dni) => {
            this.rl.question("Nombre: ", (nombre) => {
                const nuevaPersona = { dni, nombre, habilidades: [], estudios: [], experiencias: [], expectativas: [] };
                this.portfolio.agregarPersona(nuevaPersona);
                console.log("Persona agregada.");
                this.mostrarMenu();
            });
        });
    }
    borrarPersona() {
        this.rl.question("DNI de la persona a borrar: ", (dni) => {
            const eliminado = this.portfolio.borrarPersona(dni);
            if (eliminado) {
                console.log("Persona borrada.");
            }
            else {
                console.log("Persona no encontrada.");
            }
            this.mostrarMenu();
        });
    }
    modificarPersona() {
        this.rl.question("DNI de la persona a modificar: ", (dni) => {
            const persona = this.portfolio.buscarPersonaPorDNI(dni);
            if (persona) {
                console.log(`Atributos actuales de la persona:`);
                console.log(`DNI: ${persona.dni}`);
                console.log(`Nombre: ${persona.nombre}`);
                console.log(`Habilidades: ${persona.habilidades.join(', ')}`);
                console.log(`Estudios: ${persona.estudios.join(', ')}`);
                console.log(`Experiencias: ${persona.experiencias.join(', ')}`);
                console.log(`Expectativas: ${persona.expectativas.join(', ')}`);
                this.rl.question("Nuevo nombre (dejar en blanco para no modificar): ", (nombre) => {
                    const nuevosDatos = {};
                    if (nombre)
                        nuevosDatos.nombre = nombre;
                    this.rl.question("Nuevas habilidades (separadas por comas, dejar en blanco para no modificar): ", (habilidadesInput) => {
                        if (habilidadesInput) {
                            nuevosDatos.habilidades = habilidadesInput.split(',').map(h => h.trim());
                        }
                        this.rl.question("Nuevos estudios (separados por comas, dejar en blanco para no modificar): ", (estudiosInput) => {
                            if (estudiosInput) {
                                nuevosDatos.estudios = estudiosInput.split(',').map(e => e.trim());
                            }
                            this.rl.question("Nuevas experiencias (separadas por comas, dejar en blanco para no modificar): ", (experienciasInput) => {
                                if (experienciasInput) {
                                    nuevosDatos.experiencias = experienciasInput.split(',').map(e => e.trim());
                                }
                                this.rl.question("Nuevas expectativas (separadas por comas, dejar en blanco para no modificar): ", (expectativasInput) => {
                                    if (expectativasInput) {
                                        nuevosDatos.expectativas = expectativasInput.split(',').map(e => e.trim());
                                    }
                                    const modificacionExitosa = this.portfolio.modificarPersona(dni, nuevosDatos);
                                    if (modificacionExitosa) {
                                        console.log('Persona modificada con éxito.');
                                    }
                                    else {
                                        console.log('No se encontró la persona.');
                                    }
                                    this.mostrarMenu();
                                });
                            });
                        });
                    });
                });
            }
            else {
                console.log('Persona no encontrada.');
                this.mostrarMenu();
            }
        });
    }
    listarPersonaPorDNI() {
        this.rl.question("Introduce el DNI de la persona: ", (dni) => {
            const persona = this.portfolio.buscarPersonaPorDNI(dni);
            if (persona) {
                console.log(`Detalles de la persona:`);
                console.log(`DNI: ${persona.dni}`);
                console.log(`Nombre: ${persona.nombre}`);
                console.log(`Habilidades: ${persona.habilidades.join(', ')}`);
                console.log(`Estudios: ${persona.estudios.join(', ')}`);
                console.log(`Experiencias: ${persona.experiencias.join(', ')}`);
                console.log(`Expectativas: ${persona.expectativas.join(', ')}`);
            }
            else {
                console.log("Persona no encontrada.");
            }
            this.mostrarMenu(); // Muestra el menú después de listar
        });
    }
}
exports.default = UI;
