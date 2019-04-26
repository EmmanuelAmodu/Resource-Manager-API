import * as request from 'request';

export class OpenDBConnector {
    private options: any = {
        auth: {
            'user': 'testOPENDB',
            'pass': 'PASSWOEDOPENDB',
            'sendImmediately': false
        }
    };

    private dbName: string = 'OperationsManagerDB';
    private collection: string;
    private body: any;
    
    constructor() {}

    public create(collection: string, query: any) {
        this.collection = collection;
        this.body = query;
        return this.operate("create");
    }

    public read(collection: string, query: any) {
        this.collection = collection;
        this.body = query;
        return this.operate("read");
    }

    public update(collection: string, query: any) {
        this.collection = collection;
        this.body = query;
        return this.operate("update");
    }

    public delete(collection: string, query: any) {
        this.collection = collection;
        this.body = query;
        return this.operate("delete");
    }

    private url(action: string) {
        return 'http://localhost:8900/api/' + action + '/' + this.dbName + '/' + this.collection;
    }

    private operate(action: string) {
        this.options.body = this.body;
        return new Promise<any>((resolve, reject) => {
            request.post(this.url(action), { json: this.body }, (err, resp, body) => err ?  reject(err) : resolve(body));
        });
    }
}
