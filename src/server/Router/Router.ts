import { IRoutes } from "./IRoutes";
import { AuthenticationService } from '../Services/AuthenticationService';
import { FormService } from "../Services/FormService";
import { isArray } from "util";

export const router: IRoutes[] = [

    //Authentication Service
    {
        method: "post",
        path: "/auth/login",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService(req.body);
            getServ.login().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/auth/logout",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService(req.body);
            getServ.logout().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/auth/isLoggedin",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService(req.query);
            getServ.isloggedIn.then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "get",
        path: "/auth/user_details",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService(req.query);
            getServ.userData.then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/auth/create_user",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService(req.body);
            getServ.createUser().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },

    // Form Service
    {
        method: "get",
        path: "/app/forms",
        handlerfunc: function (req, res) {
            const getServ = new FormService(req.query);
            getServ.formData.then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    },
    {
        method: "post",
        path: "/app/forms",
        handlerfunc: function (req, res) {
            const getServ = new FormService(req.body);
            getServ.setFormData().then(data => res.send(cleanUpData(data))).catch(err => res.send(cleanUpData(err)));
        }
    }
];

function cleanUpData(data: any) {
    if (isArray(data)) {
        data = data.map(el => {
            if(el._id) delete el._id;
            if(el.password) delete el.password;
            if(el.expiry) delete el.expiry;
            return el;
        });
    } else {
        if(data._id) delete data._id;
        if(data.password) delete data.password;
        if(data.expiry) delete data.expiry;
    }
    return data;
}
