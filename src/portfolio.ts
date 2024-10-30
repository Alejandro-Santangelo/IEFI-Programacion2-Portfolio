import { Habilidad, Estudio, Experiencia, Expectativa, Persona } from '../src/interfaces'; // Asegúrate de que la ruta sea correcta
import { ArchivoManager } from './archivoManager'; 

class Portfolio {
    personas: Persona[];
    archivoManager: ArchivoManager;

    constructor(archivoManager: ArchivoManager) {
        this.archivoManager = archivoManager;
        this.personas = this.archivoManager.cargar();
    }

    public agregarPersona(persona: Persona): void {
        this.personas.push(persona);
        this.archivoManager.guardar(this.personas);
    }

    public modificarPersona(dni: string, nuevosDatos: Partial<Persona>): boolean {
        const index = this.personas.findIndex(persona => persona.dni === dni);
        if (index !== -1) {
            this.personas[index] = { ...this.personas[index], ...nuevosDatos };
            this.archivoManager.guardar(this.personas);
            return true;
        }
        return false;
    }

    public borrarPersona(dni: string): boolean {
        const index = this.personas.findIndex(persona => persona.dni === dni);
        if (index !== -1) {
            this.personas.splice(index, 1);
            this.archivoManager.guardar(this.personas);
            return true;
        }
        return false;
    }

    public listarPersonas(): void {
        console.log("Listado de personas:");
        if (this.personas.length === 0) {
            console.log("No hay personas en el portafolio.");
        } else {
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

    public buscarPersonaPorDNI(dni: string): Persona | undefined {
        return this.personas.find(persona => persona.dni === dni);
    }

    public obtenerPersonaPorDNI(dni: string): Persona | undefined {
        return this.buscarPersonaPorDNI(dni);
    }

    public mostrarPersonaPorDNI(dni: string): void {
        const persona = this.obtenerPersonaPorDNI(dni);
        if (persona) {
            console.log(`Detalles de la persona con DNI ${dni}:`);
            console.log(`Nombre: ${persona.nombre}`);
            console.log(`Apellido: ${persona.apellido}`);
            console.log(`Habilidades: ${persona.habilidades.map(h => h.nombre).join(", ")}`);
            console.log(`Estudios: ${persona.estudios.map(e => e.titulo).join(", ")}`);
            console.log(`Experiencias: ${persona.experiencias.map(e => e.puesto).join(", ")}`);
            console.log(`Expectativas: ${persona.expectativas.map(e => e.descripcion).join(", ")}`);
        } else {
            console.log(`No se encontró una persona con DNI ${dni}.`);
        }
    }
}

export default Portfolio;
