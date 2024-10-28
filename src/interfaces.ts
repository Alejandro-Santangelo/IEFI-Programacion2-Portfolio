export interface Habilidad {
    nombre: string;
    nivel: string; // Ejemplo: "Básico", "Intermedio", "Avanzado"
}

export interface Estudio {
    titulo: string;
    institucion: string;
    anio: number;
}

export interface Experiencia {
    puesto: string;
    empresa: string;
    anioInicio: number;
    anioFin: number;
}

export interface Expectativa {
    descripcion: string;
    salarioEsperado: number;
}

export interface Persona {
    dni: string;
    nombre: string;
    apellido: string;
    habilidades: Habilidad[];
    estudios: Estudio[];
    experiencias: Experiencia[];
    expectativas: Expectativa[];
}
