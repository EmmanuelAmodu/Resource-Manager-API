"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const Router_1 = require("./Router/Router");
const bodyParser = require("body-parser");
const multer = require("multer");
const AuthenticationService_1 = require("./Services/AuthenticationService");
const PermissionManager_1 = require("./Services/PermissionManager");
class ServerManager {
    constructor() {
        this.port = 8901;
        this.routes = Router_1.router;
        this.multerU = multer();
        this.express = Express();
        this.validateUser = (req, res, next) => {
            const username = req.body.username || req.query.username;
            const token = req.body.token || req.query.token;
            this.auth = new AuthenticationService_1.AuthenticationService({ username: username, token: token });
            this.auth.isloggedIn.then(resp => {
                if (resp.status == true) {
                    this.permission = new PermissionManager_1.PermissionManager(req.headers.authentication, req.path);
                    this.permission.isPermitted() ? next() : res.sendStatus(401).json({ "message": "You don't have permission to access this resource" });
                }
                else
                    res.status(401).json({ "message": "You don't have permission to access this resource" });
            }).catch(err => {
                console.log(err);
                res.status(401).json({ "message": "You don't have permission to access this resource" });
            });
        };
        this.setHeaders = (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "*");
            next();
        };
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(this.setHeaders);
        this.express.use("/app/*", this.validateUser);
        this.routes.forEach(route => {
            this.express[route.method](route.path, this.multerU.array(), route.handlerfunc);
        });
    }
    start() {
        this.express.listen(this.port, () => console.log(`Open app listening on port ${this.port}!`));
    }
}
exports.ServerManager = ServerManager;
