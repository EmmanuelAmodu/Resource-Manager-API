import { IRoutes } from "./IRoutes";
import * as Express from 'express';
import { AuthenticationService } from '../Services/AuthenticationService';

export const router: IRoutes[] = [
    {
        method: "post",
        path: "/login",
        handlerfunc: function(req, res) {
            console.log("hit end point");
            const getServ = new AuthenticationService();
            getServ.login().then(data => res.send(data)).catch(err => res.send(err));
        }
    }
];
