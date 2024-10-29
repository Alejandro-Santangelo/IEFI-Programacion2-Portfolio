import * as fs from 'fs';

export class ArchivoManager {
    private rutaArchivo: string;

    constructor(rutaArchivo: string) {
        this.rutaArchivo = rutaArchivo;
    }

    public cargar(): any[] {
        try {
            if (!fs.existsSync(this.rutaArchivo)) {
                fs.writeFileSync(this.rutaArchivo, JSON.stringify([], null, 2));
            }
            const data = fs.readFileSync(this.rutaArchivo, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al cargar datos desde el archivo:', error);
            return [];
        }
    }

    public guardar(datos: any[]): void {
        try {
            fs.writeFileSync(this.rutaArchivo, JSON.stringify(datos, null, 2));
        } catch (error) {
            console.error('Error al guardar datos en el archivo:', error);
        }
    }
}
