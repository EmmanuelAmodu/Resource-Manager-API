"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationService_1 = require("../Services/AuthenticationService");
const FormService_1 = require("../Services/FormService");
const util_1 = require("util");
const MenuService_1 = require("../Services/MenuService");
const ProductRequestService_1 = require("../Services/ProductRequestService");
const ExcelFileGenerator_1 = require("../Services/ExcelFileGenerator");
exports.router = [
    // Authentication Service
    {
        method: "post",
        path: "/auth/login",
        handler: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService(req.body);
            getServ.login()
                .then(data => res.send(cleanUpData(data)))
                .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/auth/logout",
        handler: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService(req.body);
            getServ.logout()
                .then(data => res.send(cleanUpData(data)))
                .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/auth/isLoggedin",
        handler: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService(req.query);
            getServ.isloggedIn
                .then(data => res.send(cleanUpData(data)))
                .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/auth/user_details",
        handler: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService(req.query);
            getServ.userData
                .then(data => res.send(cleanUpData(data)))
                .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/auth/create_user",
        handler: function (req, res) {
            const getServ = new AuthenticationService_1.AuthenticationService(req.body);
            getServ.createUser()
                .then(data => res.send(cleanUpData(data)))
                .catch(err => res.send(cleanUpData(err)));
        }
    },
    // Form Service
    {
        method: "get",
        path: "/app/forms",
        handler: function (req, res) {
            const getServ = new FormService_1.FormService(req.query);
            getServ.formData
                .then(data => res.send(cleanUpData(data)))
                .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/app/forms",
        handler: function (req, res) {
            const getServ = new FormService_1.FormService(req.body);
            getServ.setFormDataField()
                .then(data => res.send(cleanUpData(data)))
                .catch(err => res.send(cleanUpData(err)));
        }
    },
    // Request Product
    {
        method: "post",
        path: "/app/request",
        handler: function (req, res) {
            const getServ = new ProductRequestService_1.ProductRequestService(req.body);
            getServ.makeRequest()
                .then(data => res.status(getServ.statusCode).send(cleanUpData(data)))
                .catch(err => res.status(getServ.statusCode).send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/app/request",
        handler: function (req, res) {
            const getServ = new ProductRequestService_1.ProductRequestService(req.body);
            getServ.getRequest
                .then(data => res.status(getServ.statusCode).send(cleanUpData(data)))
                .catch(err => res.status(getServ.statusCode).send(cleanUpData(err)));
        }
    },
    // Menu Service
    {
        method: "post",
        path: "/app/menu",
        handler: function (req, res) {
            const getServ = new MenuService_1.MenuService(req.body);
            getServ.saveMenu()
                .then(data => res.send(cleanUpData(data)))
                .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/app/menu",
        handler: function (req, res) {
            const getServ = new MenuService_1.MenuService({});
            getServ.getMenu()
                .then(data => res.send(cleanUpData(data)))
                .catch(err => res.send(cleanUpData(err)));
        }
    },
    // File service
    {
        method: 'get',
        path: '/file/excel',
        handler: function (req, res) {
            const getServ = new ExcelFileGenerator_1.ExcelFileGenerator('', {});
            // res.send({});
            getServ.writeDataToExcel()
                .then(path => res.download(path))
                .catch(err => res.send(err));
        }
    }
];
function cleanUpData(data) {
    const arr = ["password", "expiry"];
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
//# sourceMappingURL=Router.js.map