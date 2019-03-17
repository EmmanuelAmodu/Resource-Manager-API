"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationService_1 = require("../Services/AuthenticationService");
exports.router = [
    {
        method: "post",
        path: "/login",
        handlerfunc: function (req, res) {
            console.log("hit end point");
            const getServ = new AuthenticationService_1.AuthenticationService();
            getServ.login().then(data => res.send(data)).catch(err => res.send(err));
        }
    }
];
