import * as Express from 'express';

export interface IRoutes {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handlerfunc(request: Express.Request, response: Express.Response): void;
}
