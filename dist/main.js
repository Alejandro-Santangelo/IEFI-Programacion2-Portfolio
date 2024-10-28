"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
const portfolio_1 = require("./portfolio");
const readline = require("readline");
const portfolio = new portfolio_1.default();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Función para mostrar el menú
function mostrarMenu() {
    console.log('\nOpciones:');
    console.log('1. Agregar persona');
    console.log('2. Listar personas');
    console.log('3. Borrar persona');
    console.log('4. Salir');
}
// Función para manejar las opciones del menú
function manejarOpcion(opcion) {
    switch (opcion) {
        case '1':
            agregarPersona();
            break;
        case '2':
            portfolio.listarPersonas();
            mostrarMenu();
            break;
        case '3':
            borrarPersona();
            break;
        case '4':
            rl.close();
            console.log('Saliendo...');
            break;
        default:
            console.log('Opción no válida. Por favor, intenta de nuevo.');
            mostrarMenu();
            break;
    }
}
// Función para agregar una persona
function agregarPersona() {
    rl.question('Ingrese el DNI: ', (dni) => {
        rl.question('Ingrese el nombre: ', (nombre) => {
            rl.question('Ingrese las habilidades (separadas por comas): ', (habilidadesInput) => {
                const habilidades = habilidadesInput.split(',').map(h => h.trim());
                rl.question('Ingrese los estudios (separados por comas): ', (estudiosInput) => {
                    const estudios = estudiosInput.split(',').map(e => e.trim());
                    rl.question('Ingrese las experiencias (separadas por comas): ', (experienciasInput) => {
                        const experiencias = experienciasInput.split(',').map(ex => ex.trim());
                        rl.question('Ingrese las expectativas (separadas por comas): ', (expectativasInput) => {
                            const expectativas = expectativasInput.split(',').map(ex => ex.trim());
                            const persona = { dni, nombre, habilidades, estudios, experiencias, expectativas };
                            portfolio.agregarPersona(persona);
                            console.log('Persona agregada exitosamente.');
                            mostrarMenu();
                        });
                    });
                });
            });
        });
    });
}
// Función para borrar una persona
function borrarPersona() {
    rl.question('Ingrese el DNI de la persona a borrar: ', (dni) => {
        if (portfolio.borrarPersona(dni)) {
            console.log(`Persona con DNI ${dni} borrada con éxito.`);
        }
        else {
            console.log(`Persona con DNI ${dni} no encontrada.`);
        }
        mostrarMenu();
    });
}
// Mostrar el menú inicial
mostrarMenu();
// Escuchar entrada del usuario
rl.on('line', (input) => {
    manejarOpcion(input);
});
