import * as Express from 'express';

export interface IRoutes {
    method: 'get' | 'post' | 'put' | 'delete' | 'options';
    path: string;
    handler(request: Express.Request, response: Express.Response): void;
}
