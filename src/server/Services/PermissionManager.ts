import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';

// TODO DESIGN this class logic
export class PermissionManager {
    /**
     *
     */
    constructor(private username, private path) {}

    public isPermitted(){
        // TODO implement is permitted
        return true;
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