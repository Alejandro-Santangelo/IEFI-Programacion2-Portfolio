import { ArchivoManager } from './archivoManager'; // Importación nombrada
import { IPersona } from './IPersona';



class Portfolio {
    personas: IPersona[];
    archivoManager: ArchivoManager; // Agrega una propiedad para el archivo manager

    constructor(archivoManager: ArchivoManager) { // Modifica el constructor para aceptar un argumento
        this.archivoManager = archivoManager; // Inicializa el archivo manager
        this.personas = this.archivoManager.cargar(); // Cargar datos al iniciar
    }

    // Método para agregar una persona
    public agregarPersona(persona: IPersona): void {
        this.personas.push(persona);
        this.archivoManager.guardar(this.personas); // Guardar cambios en el archivo
    }

    // Método para modificar una persona existente
    public modificarPersona(dni: string, nuevosDatos: Partial<IPersona>): boolean {
        const index = this.personas.findIndex(persona => persona.dni === dni);
        if (index !== -1) {
            // Actualiza los atributos de la persona
            this.personas[index] = { ...this.personas[index], ...nuevosDatos };
            this.archivoManager.guardar(this.personas); // Guardar cambios en el archivo
            return true; // Persona modificada
        }
        return false; // Persona no encontrada
    }

    // Método para borrar una persona por DNI
    public borrarPersona(dni: string): boolean {
        const index = this.personas.findIndex(persona => persona.dni === dni);
        if (index !== -1) {
            this.personas.splice(index, 1);
            this.archivoManager.guardar(this.personas); // Guardar cambios en el archivo
            return true; // Persona borrada
        }
        return false; // Persona no encontrada
    }

    // Método para listar personas
    public listarPersonas(): void {
        console.log("\nLISTADO DE PERSONAS:");
        if (this.personas.length === 0) {
            console.log("\nNo hay personas en el portafolio.");
        } else {
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
    public buscarPersonaPorDNI(dni: string): IPersona | undefined {
        return this.personas.find(persona => persona.dni === dni);
    }

    // Método para obtener los detalles de una persona por DNI
    public obtenerPersonaPorDNI(dni: string): IPersona | undefined {
        const persona = this.buscarPersonaPorDNI(dni);
        return persona; // Devuelve la persona si se encuentra
    }

    // Método para mostrar los detalles de una persona por DNI
    public mostrarPersonaPorDNI(dni: string): void {
        const persona = this.obtenerPersonaPorDNI(dni);
        if (persona) {
            console.log(`Detalles de la persona con DNI ${dni}:`);
            console.log(`Nombre: ${persona.nombre}`);
            console.log(`Habilidades: ${persona.habilidades.join(", ")}`);
            console.log(`Estudios: ${persona.estudios.join(", ")}`);
            console.log(`Experiencias: ${persona.experiencias.join(", ")}`);
            console.log(`Expectativas: ${persona.expectativas.join(", ")}`);
        } else {
            console.log(`No se encontró una persona con DNI ${dni}.`);
        }
    }
}

export default Portfolio;
