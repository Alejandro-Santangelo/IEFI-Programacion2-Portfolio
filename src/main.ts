import { ArchivoManager } from './archivoManager';
import Portfolio from './portfolio';
import UI from './UI';

const archivoManager = new ArchivoManager('portfolio.json');
const portfolio = new Portfolio(archivoManager);
const ui = new UI(portfolio);

// Llamamos a mostrar el menú
//ui.mostrarMenu();
