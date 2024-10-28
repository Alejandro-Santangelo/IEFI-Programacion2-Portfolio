"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portfolio = void 0;
const fs = __importStar(require("fs"));
class Portfolio {
    constructor() {
        this.personas = [];
    }
    // Método para agregar una persona
    agregarPersona(persona) {
        this.personas.push(persona);
        this.guardarEnArchivo();
    }
    // Método para borrar una persona por DNI
    borrarPersona(dni) {
        this.personas = this.personas.filter(persona => persona.dni !== dni);
        this.guardarEnArchivo();
    }
    // Método para listar todas las personas
    listarPersonas() {
        return this.personas;
    }
    // Método para cargar personas desde un archivo JSON
    cargarDesdeArchivo() {
        try {
            const data = fs.readFileSync('portfolio.json', 'utf-8');
            this.personas = JSON.parse(data);
        }
        catch (error) {
            console.error('Error al cargar datos desde el archivo:', error);
        }
    }
    // Método para guardar datos en un archivo JSON
    guardarEnArchivo() {
        fs.writeFileSync('portfolio.json', JSON.stringify(this.personas, null, 2));
    }
}
exports.Portfolio = Portfolio;
