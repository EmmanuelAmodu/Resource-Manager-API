import * as Express from 'express';
import { router } from './Router/Router';
import { IRoutes } from './Router/IRoutes';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { AuthenticationService } from './Services/AuthenticationService';
import { PermissionManager } from './Services/PermissionManager';

export class ServerManager {
    public port: number = 8901;
    private express = Express();
    private routes: IRoutes[] = router;
    private multerU = multer();
    private auth: AuthenticationService;
    private permission: PermissionManager;

    constructor() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));

        this.routes.forEach(route => {
            this.express[route.method](route.path, this.multerU.array(), route.handlerfunc);
        });

        this.express.use("/app", this.validateUser);
    }

    private validateUser = (req: Express.Request, res: Express.Response, next) => {
        this.auth = new AuthenticationService(req.headers.authentication);
        this.auth.isloggedIn.then(resp => {
            if (resp.status == true) {
                this.permission = new PermissionManager(req.headers.authentication, req.path);
                this.permission.isPermitted() ? next() : res.send(401).json({"message": "You don't have permission to access this resource"});
            } else {
                res.send(401).json({"message": "Please loggin to continue"});
            }
        });
    }

    public start() {
        this.express.listen(this.port, () => console.log(`Open app listening on port ${this.port}!`));
    }
}
