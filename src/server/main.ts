import * as Express from 'express';
import { router } from './Router/Router';
import { IRoutes } from './Router/IRoutes';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';

export class ServerManager {
    public port: number = 8900;
    private express = Express();
    private routes: IRoutes[] = router;
    private multerU = multer();

    /**
     *
    */
    constructor() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use("/api");

        this.routes.forEach(route => {
            this.express[route.method](route.path, this.multerU.array(), route.handlerfunc);
        });
    }

    public start() {
        this.express.listen(this.port, () => console.log(`Open app listening on port ${this.port}!`));
    }
}
