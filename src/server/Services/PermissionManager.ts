import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';

// TODO DESIGN this class logic
export class PermissionManager extends OpenDBConnector {
    /**
     *
     */
    constructor(private username: string| string[], private path: string) {
        super();
    }

    public isPermitted(){
        // TODO implement is permitted
        return true;
    }

    public setPermission(){

    }

    public deletePermission(){

    }

    private getPermission(){
        
    }
}