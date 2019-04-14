import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';

export class MenuService {

    constructor(private params: any){}

    private openDB(table: string, body: any): OpenDBConnector {
        return new OpenDBConnector(table, body);
    }

    public getMenu() {
        return new Promise<any>((resolve, reject) => {
            this.openDB("menu", this.params).read().then(res => {
                resolve(res);
            }).catch(err => {
                // TODO improve response
                reject(err);
            });
        });
    }

    public saveMenu() {
        return new Promise<any>((resolve, reject) => {
            this.openDB("menu", this.params).create().then(res => {
                // TODO improve response
                resolve(res);
            }).catch(err => {
                // TODO improve response
                reject(err);
            });
        });
    }

}