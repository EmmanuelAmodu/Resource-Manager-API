import { IRoutes } from "./IRoutes";
import * as Express from 'express';
import { AuhenticationService } from '../Services/AuhenticationService';

export const router: IRoutes[] = [
    {
        method: "post",
        path: "/login",
        handlerfunc: function(request: Express.Request, response: Express.Response) {
            const getServ = new AuhenticationService(request, response);
            getServ.run();
        }
    }
];
