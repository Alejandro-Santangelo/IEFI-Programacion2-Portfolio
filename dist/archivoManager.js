"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchivoManager = void 0;
const fs = require("fs");
class ArchivoManager {
    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }
    cargar() {
        try {
            if (!fs.existsSync(this.rutaArchivo)) {
                fs.writeFileSync(this.rutaArchivo, JSON.stringify([], null, 2));
            }
            const data = fs.readFileSync(this.rutaArchivo, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error al cargar datos desde el archivo:', error);
            return [];
        }
    }
    guardar(datos) {
        try {
            fs.writeFileSync(this.rutaArchivo, JSON.stringify(datos, null, 2));
        }
        catch (error) {
            console.error('Error al guardar datos en el archivo:', error);
        }
    }
}
exports.ArchivoManager = ArchivoManager;
