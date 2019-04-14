"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationService_1 = require("../Services/AuthenticationService");
const FormService_1 = require("../Services/FormService");
const util_1 = require("util");
const MenuService_1 = require("../Services/MenuService");
exports.router = [
    // Authentication Service
    {
        method: "post",
        path: "/auth/login",
        handlerfunc: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService(req.body);
            getServ.login().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/auth/logout",
        handlerfunc: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService(req.body);
            getServ.logout().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/auth/isLoggedin",
        handlerfunc: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService(req.query);
            getServ.isloggedIn.then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/auth/user_details",
        handlerfunc: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService(req.query);
            getServ.userData.then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/auth/create_user",
        handlerfunc: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService(req.body);
            getServ.createUser().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    // Form Service
    {
        method: "get",
        path: "/app/forms",
        handlerfunc: function (req, res) {
            const getServ = new FormService_1.FormService(req.query);
            getServ.formData.then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/app/forms",
        handlerfunc: function (req, res) {
            const getServ = new FormService_1.FormService(req.body);
            getServ.setFormDataField().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/app/forms/save",
        handlerfunc: function (req, res) {
            const getServ = new FormService_1.FormService(req.body);
            getServ.saveFormData().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    // Menu Service
    {
        method: "post",
        path: "/app/menu",
        handlerfunc: function (req, res) {
            const getServ = new MenuService_1.MenuService(req.body);
            getServ.saveMenu().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/app/menu",
        handlerfunc: function (req, res) {
            const getServ = new MenuService_1.MenuService(req.body);
            getServ.getMenu().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    }
];
function cleanUpData(data) {
    const arr = ["_id", "password", "expiry"];
    if (util_1.isArray(data)) {
        data = data.map(el => {
            arr.forEach(e => el[e] ? delete el[e] : el[e]);
            return el;
        });
    }
    else
        arr.forEach(e => data[e] ? delete data[e] : data[e]);
    return data;
}
