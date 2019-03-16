"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var Authenticate_1 = require("../Authentication/Authenticate");
var Router_1 = require("./Router/Router");
var bodyParser = require("body-parser");
var multer = require("multer");
var ServerManager = /** @class */ (function () {
    /**
     *
    */
    function ServerManager() {
        var _this = this;
        this.port = 8900;
        this.express = Express();
        this.routes = Router_1.router;
        this.multerU = multer();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use("/api", this.validateUser);
        this.routes.forEach(function (route) {
            _this.express[route.method](route.path, _this.multerU.array(), route.handlerfunc);
        });
    }
    ServerManager.prototype.validateUser = function (request, response, next) {
        var auth = Buffer.from(request.headers.authorization.split(" ")[1], 'base64').toString().split(":");
        var authen = new Authenticate_1.Authenticator({
            username: auth[0],
            password: auth[1]
        });
        authen.isValid() ? next() :
            response.status(401).json({
                status: "request failed",
                reason: "Authentication failed",
                solution: "Contact Adminstrator"
            });
    };
    ServerManager.prototype.start = function () {
        var _this = this;
        this.express.listen(this.port, function () { return console.log("Open app listening on port " + _this.port + "!"); });
    };
    return ServerManager;
}());
exports.ServerManager = ServerManager;
