import { IRoutes } from "./IRoutes";
import { AuthenticationService } from '../Services/AuthenticationService';

export const router: IRoutes[] = [
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
    }
];
