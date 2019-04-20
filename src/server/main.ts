import * as Express from 'express';
import { router } from './Router/Router';
import { IRoutes } from './Router/IRoutes';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { AuthenticationService } from './Services/AuthenticationService';
import { PermissionManager } from './Services/PermissionManager';

export class ServerManager {
    public port: number = 8901;
    private routes: IRoutes[] = router;
    private multerU = multer();
    private auth: AuthenticationService;
    private permission: PermissionManager;
    private express = Express();

    constructor() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(this.setHeaders);
        // TODO add custome validation to the options
        this.express.options("/*", (req, res) => res.sendStatus(200));
        this.express.get("/app/*", this.validateUser);
        this.express.post("/app/*", this.validateUser);
    
        this.routes.forEach(route => {
            this.express[route.method](route.path, this.multerU.array(), route.handler);
        });
    }

    private validateUser = (req: Express.Request, res: Express.Response, next: Function) => {
        const username = req.headers.username || req.query.username;
        const token = req.headers.token || req.query.token;
        this.auth = new AuthenticationService({username: username, token: token});
        this.auth.isloggedIn.then(resp => {
            if (resp.status == true) {
                this.permission = new PermissionManager(req.headers.authentication, req.path);
                this.permission.isPermitted() ? next() : res.sendStatus(401).json({"message": "You don't have permission to access this resource"});
            } else res.status(401).json({"message": "You don't have permission to access this resource"});
        }).catch(err => {
            console.log(err);
            res.status(401).json({"message": "You don't have permission to access this resource"});
        });
    }

    private setHeaders = (req: Express.Request, res: Express.Response, next: Function) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    }

    public start() {
        this.express.listen(this.port, () => {
            console.log(`Open app listening on port ${this.port}!`);
            
        });
    }
}
