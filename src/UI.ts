import { IPersona } from './IPersona';
import Portfolio from './portfolio';
import * as readline from 'readline';


class UI {
    private portfolio: Portfolio;
    private rl: readline.Interface;

    constructor(portfolio: Portfolio) {
        this.portfolio = portfolio;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.mostrarMenu();
    }

    private mostrarMenu(): void {
        console.log("\nMENÚ DE OPCIONES:");
        console.log("1. Listar personas");
        console.log("2. Agregar persona");
        console.log("3. Borrar persona");
        console.log("4. Modificar persona");
        console.log("5. Listar persona por DNI"); // Nueva opción
        console.log("6. Salir"); // Actualizar número de opción

        this.rl.question("\nINGRESA LA OPCIÓN SELECCIONADA: ", (opcion) => {
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

    private agregarPersona(): void {
        console.log("\nAGREGAR PERSONA:");
        this.rl.question("DNI: ", (dni) => {
            this.rl.question("Nombre: ", (nombre) => {
                const nuevaPersona: IPersona = { dni, nombre, habilidades: [], estudios: [], experiencias: [], expectativas: [] };
                this.portfolio.agregarPersona(nuevaPersona);
                console.log("\nPERSONA AGREGADA CON ÉXITO.");
                this.mostrarMenu();
            });
        });
    }

    private borrarPersona(): void {
        this.rl.question("\nINGRESE EL DNI DE LA PERSONA A BORRAR: ", (dni) => {
            const eliminado = this.portfolio.borrarPersona(dni);
            if (eliminado) {
                console.log("\nPERSONA BORRADA CON ÉXITO.");
            } else {
                console.log("\nPERSONA NO ENCONTRADA.");
            }
            this.mostrarMenu();
        });
    }

    private modificarPersona(): void {
        this.rl.question("\nDNI de la persona a modificar: ", (dni) => {
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
                    const nuevosDatos: Partial<IPersona> = {};

                    if (nombre) nuevosDatos.nombre = nombre;

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
                                    } else {
                                        console.log('No se encontró la persona.');
                                    }
                                    this.mostrarMenu();
                                });
                            });
                        });
                    });
                });
            } else {
                console.log('Persona no encontrada.');
                this.mostrarMenu();
            }
        });
    }

    private listarPersonaPorDNI(): void {
        this.rl.question("\nIntroduce el DNI de la persona: ", (dni) => {
            const persona = this.portfolio.buscarPersonaPorDNI(dni);
            if (persona) {
                console.log(`\nDetalles de la persona:`);
                console.log(`DNI: ${persona.dni}`);
                console.log(`Nombre: ${persona.nombre}`);
                console.log(`Habilidades: ${persona.habilidades.join(', ')}`);
                console.log(`Estudios: ${persona.estudios.join(', ')}`);
                console.log(`Experiencias: ${persona.experiencias.join(', ')}`);
                console.log(`Expectativas: ${persona.expectativas.join(', ')}`);
            } else {
                console.log("Persona no encontrada.");
            }
            this.mostrarMenu(); // Muestra el menú después de listar
        });
    }
}

export default UI;
