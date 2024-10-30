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
        console.log("1. Listado de Personas");
        console.log("2. Mostrar Persona por DNI");
        console.log("3. Agregar Persona");
        console.log("4. Borrar Persona");
        console.log("5. Modificar Persona");
        console.log("6. Salir");
        this.rl.question("Elige una opción: ", (opcion) => {
            switch (opcion) {
                case '1':
                    this.portfolio.listarPersonas();
                    break;
                case '2':
                    this.listarPersonaPorDNI();
                    return;
                case '3':
                    this.agregarPersona();
                    return;
                case '4':
                    this.borrarPersona();
                    return;
                case '5':
                    this.modificarPersona();
                    return;
                case '6':
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
                this.rl.question("Apellido: ", (apellido) => {
                    this.rl.question("Habilidades (separadas por comas): ", (habilidadesInput) => {
                        const habilidades = habilidadesInput.split(',').map(h => ({ nombre: h.trim(), nivel: 'Básico' }));
                        this.rl.question("Estudios (separadas por comas): ", (estudiosInput) => {
                            const estudios = estudiosInput.split(',').map(e => ({ titulo: e.trim(), institucion: 'Desconocida', anio: 2023 }));
                            this.rl.question("Experiencias (separadas por comas): ", (experienciasInput) => {
                                const experiencias = experienciasInput.split(',').map(e => ({ puesto: e.trim(), empresa: 'Desconocida', anioInicio: 2022, anioFin: 2023 }));
                                this.rl.question("Expectativas: ", (expectativasInput) => {
                                    const expectativas = expectativasInput.split(',').map(e => ({ descripcion: e.trim(), salarioEsperado: 0 }));
                                    const nuevaPersona = { dni, nombre, apellido, habilidades, estudios, experiencias, expectativas };
                                    this.portfolio.agregarPersona(nuevaPersona);
                                    console.log("Persona agregada.");
                                    this.mostrarMenu();
                                });
                            });
                        });
                    });
                });
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
                console.log(`Apellido: ${persona.apellido}`);
                console.log(`Habilidades: ${persona.habilidades.map(h => h.nombre).join(', ')}`);
                console.log(`Estudios: ${persona.estudios.map(e => e.titulo).join(', ')}`);
                console.log(`Experiencias: ${persona.experiencias.map(e => e.puesto).join(', ')}`);
                console.log(`Expectativas: ${persona.expectativas.map(e => e.descripcion).join(', ')}`);
                this.rl.question("Nuevo nombre (dejar en blanco para no modificar): ", (nombre) => {
                    const nuevosDatos = {};
                    if (nombre)
                        nuevosDatos.nombre = nombre;
                    this.rl.question("Nuevo apellido (dejar en blanco para no modificar): ", (apellido) => {
                        if (apellido)
                            nuevosDatos.apellido = apellido;
                        this.rl.question("Nuevas habilidades (separadas por comas, dejar en blanco para no modificar): ", (habilidadesInput) => {
                            if (habilidadesInput) {
                                nuevosDatos.habilidades = habilidadesInput.split(',').map(h => ({ nombre: h.trim(), nivel: 'Básico' }));
                            }
                            this.rl.question("Nuevos estudios (separadas por comas, dejar en blanco para no modificar): ", (estudiosInput) => {
                                if (estudiosInput) {
                                    nuevosDatos.estudios = estudiosInput.split(',').map(e => ({ titulo: e.trim(), institucion: 'Desconocida', anio: 2023 }));
                                }
                                this.rl.question("Nuevas experiencias (separadas por comas, dejar en blanco para no modificar): ", (experienciasInput) => {
                                    if (experienciasInput) {
                                        nuevosDatos.experiencias = experienciasInput.split(',').map(e => ({ puesto: e.trim(), empresa: 'Desconocida', anioInicio: 2022, anioFin: 2023 }));
                                    }
                                    this.rl.question("Nuevas expectativas (separadas por comas, dejar en blanco para no modificar): ", (expectativasInput) => {
                                        if (expectativasInput) {
                                            nuevosDatos.expectativas = expectativasInput.split(',').map(e => ({ descripcion: e.trim(), salarioEsperado: 0 }));
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
                console.log(`Apellido: ${persona.apellido}`);
                console.log(`Habilidades: ${persona.habilidades.map(h => h.nombre).join(', ')}`);
                console.log(`Estudios: ${persona.estudios.map(e => e.titulo).join(', ')}`);
                console.log(`Experiencias: ${persona.experiencias.map(e => e.puesto).join(', ')}`);
                console.log(`Expectativas: ${persona.expectativas.map(e => e.descripcion).join(', ')}`);
            }
            else {
                console.log("Persona no encontrada.");
            }
            this.mostrarMenu();
        });
    }
}
exports.default = UI;
