import * as Express from 'express';

export interface IRoutes {
    method: 'get' | 'post' | 'put' | 'delete' | 'options';
    path: string;
    handlerfunc(request: Express.Request, response: Express.Response): void;
}
