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
        this.express = Express();
        this.routes = Router_1.router;
        this.multerU = multer();
        this.validateUser = (req, res, next) => {
            this.auth = new AuthenticationService_1.AuthenticationService({ username: req.headers.username, token: req.headers.token });
            this.auth.isloggedIn.then(resp => {
                if (resp.status == true) {
                    this.permission = new PermissionManager_1.PermissionManager(req.headers.authentication, req.path);
                    this.permission.isPermitted() ? next() : res.send(401).json({ "message": "You don't have permission to access this resource" });
                }
                else {
                    res.send(401).json({ "message": "Please loggin to continue" });
                }
            }).catch(err => {
                console.log(err);
                res.send(401).json({ "message": "Please loggin to continue" });
            });
        };
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
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
