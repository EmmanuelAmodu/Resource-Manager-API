"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationService_1 = require("../Services/AuthenticationService");
exports.router = [
    {
        method: "post",
        path: "/login",
        handlerfunc: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService({
                "username": "EAmodu",
                "password": "gyuftydycfgxgf"
            });
            getServ.login().then(data => res.send(data)).catch(err => res.send(err));
        }
    },
    {
        method: "post",
        path: "/logout",
        handlerfunc: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService({ "username": "EAmodu" });
            getServ.logout().then(data => res.send(data)).catch(err => res.send(err));
        }
    }
];
