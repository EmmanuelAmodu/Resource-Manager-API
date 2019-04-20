import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';

export class MenuService extends OpenDBConnector {

    constructor(private params: any){
        super()
    }

    public getMenu() {
        return new Promise<any>((resolve, reject) => {
            this.read("menu", this.params).then(res => {
                resolve(res);
            }).catch(err => {
                // TODO improve response
                reject(err);
            });
        });
    }

    public saveMenu() {
        return new Promise<any>((resolve, reject) => {
            this.create("menu", this.params).then(res => {
                // TODO improve response
                resolve(res);
            }).catch(err => {
                // TODO improve response
                reject(err);
            });
        });
    }

}