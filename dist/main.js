"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const archivoManager_1 = require("./archivoManager");
const portfolio_1 = require("./portfolio");
const UI_1 = require("./UI");
const archivoManager = new archivoManager_1.ArchivoManager('portfolio.json');
const portfolio = new portfolio_1.default(archivoManager);
const ui = new UI_1.default(portfolio);
