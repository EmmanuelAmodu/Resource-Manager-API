import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';
import { AuthenticationService } from './AuthenticationService';

class PermissionManager {
    private isLoggedIn: Promise<boolean>;
    /**
     *
     */
    constructor(private auth) {
        this.isLoggedIn = new AuthenticationService(auth).isloggedIn;
    }

    public get isPermitted(){
        return new Promise<boolean>((resolve, reject) => {
            this.getPermission().then(res => {
                res.length > 0 ? resolve(true) : resolve(false);
            }).catch(err => reject(err));
        });
    }

    private openDB(table: string, body: any): OpenDBConnector {
        return new OpenDBConnector(table, body);
    }

    public setPermission(){
        
    }

    public deletePermission(){

    }

    private getPermission(){
        const permInfo = {};
        permInfo["username"] = this.auth.username;
        permInfo["userPermission"] = this.auth.userPermission;
        return new Promise<any>((resolve, reject) => {
            this.isLoggedIn.then(res => {
                if (res === true){
                this.openDB("userpermission", permInfo)
                    .read().then(resp => resolve(resp))
                    .catch(err => reject(err))
                } else reject({"err": "getting user permissions"})
            })
        });
    }
}