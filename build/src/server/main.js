"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const Router_1 = require("./Router/Router");
const bodyParser = require("body-parser");
const multer = require("multer");
class ServerManager {
    constructor() {
        this.port = 8901;
        this.express = Express();
        this.routes = Router_1.router;
        this.multerU = multer();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.routes.forEach(route => {
            this.express[route.method](route.path, this.multerU.array(), route.handlerfunc);
        });
    }
    start() {
        this.express.listen(this.port, () => console.log(`Open app listening on port ${this.port}!`));
    }
}
exports.ServerManager = ServerManager;
