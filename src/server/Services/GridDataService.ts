import { OpenDBConnector } from '../Providers/OpenDBConnector';

export class GridDataService extends OpenDBConnector {
    private queryObject: any;

    constructor(private params: any){
        super();
    }

    public get data() {
        return this.getData();
    }

    private getData() {
        return new Promise<any>((resolve, reject) => {
            this.read(this.params.entity, this.params.query)
                .then(res => resolve(res))
                    .catch(err => reject(err));
        });
    }

}
