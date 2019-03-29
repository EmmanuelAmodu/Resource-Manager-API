import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';

export class GridDataService {
    private queryObject: any;

    constructor(private params: any){}

    private openDB(table: string, body: any): OpenDBConnector {
        return new OpenDBConnector(table, body);
    }

    public get data() {
        return this.getData();
    }

    private getData() {
        this.openDB(this.params.entity, this.params.query).read()
    }

    private sqlInterpreter(){

    }

}
