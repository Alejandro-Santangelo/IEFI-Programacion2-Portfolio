// portfolio.ts
import * as fs from 'fs';

interface Persona {
    dni: string; // DNI como propiedad
    nombre: string;
    habilidades: string[];
    estudios: string[];
    experiencias: string[];
    expectativas: string[];
}

class Portfolio {
    personas: Persona[];

    constructor() {
        this.personas = [];
        this.cargarDesdeArchivo(); // Cargar datos al iniciar
    }

    // Método para cargar personas desde un archivo JSON
    public cargarDesdeArchivo(): void {
        try {
            if (!fs.existsSync('portfolio.json')) {
                fs.writeFileSync('portfolio.json', JSON.stringify([], null, 2)); // Crear el archivo si no existe
            }
            const data = fs.readFileSync('portfolio.json', 'utf-8');
            this.personas = JSON.parse(data);
        } catch (error) {
            console.error('Error al cargar datos desde el archivo:', error);
        }
    }

    // Método para guardar personas en un archivo JSON
    public guardarEnArchivo(): void {
        fs.writeFileSync('portfolio.json', JSON.stringify(this.personas, null, 2));
    }

    // Método para agregar una persona
    public agregarPersona(persona: Persona): void {
        this.personas.push(persona);
        this.guardarEnArchivo(); // Guardar cambios en el archivo
    }

    // Método para borrar una persona por DNI
    public borrarPersona(dni: string): boolean {
        const index = this.personas.findIndex(persona => persona.dni === dni);
        if (index !== -1) {
            this.personas.splice(index, 1);
            this.guardarEnArchivo(); // Guardar cambios en el archivo
            return true; // Persona borrada
        }
        return false; // Persona no encontrada
    }

    // Método para listar personas
    public listarPersonas(): void {
        console.log("Listado de personas:");
        if (this.personas.length === 0) {
            console.log("No hay personas en el portafolio.");
        } else {
            this.personas.forEach(persona => {
                console.log(`DNI: ${persona.dni}, Nombre: ${persona.nombre}`);
            });
        }
    }

    // Método para buscar una persona por DNI
    public buscarPersonaPorDNI(dni: string): Persona | undefined {
        return this.personas.find(persona => persona.dni === dni);
    }
}

export default Portfolio;
