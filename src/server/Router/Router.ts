import { IRoutes } from "./IRoutes";
import { AuthenticationService } from '../Services/AuthenticationService';

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
    },
    {
        method: "post",
        path: "/user_details",
        handlerfunc: function(req, res) {
            console.log("req.body", req.body);
            const getServ = new AuthenticationService({
                "username": "EAmodu",
                "token": "7f01de6431eaf91c3fdeafeebe43a03f0c36009f10bc33b57f5a76db5d0eea8f0c2e95ba6ebc626a0c5f5dae11efba53"
            });
            getServ.userData.then(data => res.send(data)).catch(err => res.send(err));
        }
    }
];
