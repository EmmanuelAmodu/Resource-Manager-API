import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';
import { AuthenticationService } from './AuthenticationService';

class PermissionManager {
    private isLoggedIn: Promise<boolean> = new AuthenticationService(this.auth).isloggedIn;;
    /**
     *
     */
    constructor(private auth) {
    }

    public get isPermitted(){
        return null
    }

    private openDB(table: string, body: any): OpenDBConnector {
        return new OpenDBConnector(table, body);
    }

    public setPermission(){

    }

    public deletePermission(){

    }

    private getPermission(){
        
    }
}