import { IRoutes } from "./IRoutes";
import * as Express from 'express';
import { AuthenticationService } from '../Services/AuthenticationService';
import { stringify } from "querystring";

export const router: IRoutes[] = [
    {
        method: "post",
        path: "/login",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService({
                "username": "EAmodu",
                "password": "gyuftydycfgxgf"
            });
            getServ.login().then(data => res.send(data)).catch(err => res.send(err));
        }
    },
    {
        method: "post",
        path: "/logout",
        handlerfunc: function(req, res) {
            const getServ = new AuthenticationService({"username": "EAmodu"});
            getServ.logout().then(data => res.send(data)).catch(err => res.send(err));
        }
    }
];
