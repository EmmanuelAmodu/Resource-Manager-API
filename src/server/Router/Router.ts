import { IRoutes } from "./IRoutes";
import { AuthenticationService } from '../Services/AuthenticationService';
import { FormService } from "../Services/FormService";
import { isArray } from "util";
import { MenuService } from "../Services/MenuService";
import { ProductRequestService } from "../Services/ProductRequestService";
import { ExcelFileGenerator } from "../Services/ExcelFileGenerator";

export const router: IRoutes[] = [

    // Authentication Service
    {
        method: "post",
        path: "/auth/login",
        handler: function(req, res) {
            const getServ = new AuthenticationService(req.body);
            getServ.login()
                .then(data => res.send(cleanUpData(data)))
                    .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/auth/logout",
        handler: function(req, res) {
            const getServ = new AuthenticationService(req.body);
            getServ.logout()
                .then(data => res.send(cleanUpData(data)))
                    .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/auth/isLoggedin",
        handler: function(req, res) {
            const getServ = new AuthenticationService(req.query);
            getServ.isloggedIn
                .then(data => res.send(cleanUpData(data)))
                    .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/auth/user_details",
        handler: function(req, res) {
            const getServ = new AuthenticationService(req.query);
            getServ.userData
                .then(data => res.send(cleanUpData(data)))
                    .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/auth/create_user",
        handler: function(req, res) {
            const getServ = new AuthenticationService(req.body);
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
            const getServ = new FormService(req.query);
            getServ.formData
                .then(data => res.send(cleanUpData(data)))
                    .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/app/forms",
        handler: function (req, res) {
            const getServ = new FormService(req.body);
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
            const getServ = new ProductRequestService(req.body);
            getServ.makeRequest()
                .then(data => res.status(getServ.statusCode).send(cleanUpData(data)))
                    .catch(err => res.status(getServ.statusCode).send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/app/request",
        handler: function (req, res) {
            const getServ = new ProductRequestService(req.body);
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
            const getServ = new MenuService(req.body);
            getServ.saveMenu()
                .then(data => res.send(cleanUpData(data)))
                    .catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/app/menu",
        handler: function (req, res) {
            const getServ = new MenuService({});
            getServ.getMenu()
                .then(data => res.send(cleanUpData(data)))
                    .catch(err => res.send(cleanUpData(err)));
        }
    },

    // File service
    {
        method: 'get',
        path: '/file',
        handler: function(req, res) {
            const getServ = new ExcelFileGenerator(req.query.fileName);
            getServ.writeDataToExcel()
                .then(path => res.download(path))
                    .catch(err => res.send(err));
        }
    }
];

function cleanUpData(data: any) {
    const arr = ["password", "expiry"];
    if (isArray(data)) {
        data = data.map(el => {
            arr.forEach(e => el[e] ?  delete el[e] : el[e]);
            return el;
        });
    } else arr.forEach(e => data[e] ?  delete data[e] : data[e]);
    return data;
}
