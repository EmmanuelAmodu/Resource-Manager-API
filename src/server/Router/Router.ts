import { IRoutes } from "./IRoutes";
import { AuthenticationService } from '../Services/AuthenticationService';
import { FormService } from "../Services/FormService";

export const router: IRoutes[] = [

    //Authentication
    {
        method: "post",
        path: "/auth/login",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService(req.body);
            getServ.login().then(data => res.send(data)).catch(err => res.send(err));
        }
    },
    {
        method: "post",
        path: "/auth/logout",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService(req.body);
            getServ.logout().then(data => res.send(data)).catch(err => res.send(err));
        }
    },
    {
        method: "get",
        path: "/auth/isLoggedin",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService(req.query);
            getServ.isloggedIn.then(data => res.send(data)).catch(err => res.send(err));
        }
    },
    {
        method: "get",
        path: "/auth/user_details",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService(req.query);
            getServ.userData.then(data => res.send(data)).catch(err => res.send(err));
        }
    },
    {
        method: "post",
        path: "/auth/create_user",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService(req.body);
            getServ.createUser().then(data => res.send(data)).catch(err => res.send(err));
        }
    },

    // Form service
    {
        method: "get",
        path: "/app/forms",
        handlerfunc: function (req, res) {
            const getServ = new FormService(req.query);
            getServ.formData.then(data => res.send(data)).catch(err => res.send(err));
        }
    },
    {
        method: "post",
        path: "/app/forms",
        handlerfunc: function (req, res) {
            const getServ = new FormService(req.body);
            getServ.setFormData().then(data => res.send(data)).catch(err => res.send(err));
        }
    }
];
