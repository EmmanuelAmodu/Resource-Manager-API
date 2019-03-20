import * as request from 'request';

export class OpenDBConnector {
    private options: any = {
        url: 'http://localhost:8900/api/',
        auth: {
            'user': 'testOPENDB',
            'pass': 'PASSWOEDOPENDB',
            'sendImmediately': false
        }
    };
    
    constructor(private modelName: string, private body: any) {}

    public create() {
        return this.operate("create");
    }

    public read() {
        return this.operate("read");
    }

    public update() {
        return this.operate("update");
    }

    public delete() {
        return this.operate("delete");
    }

    private operate(action: string) {
        this.options.body = this.body;
        this.options.url = this.options.url + action + '/' + this.modelName;
        const that = this;
        return new Promise<any>(function(resolve, reject) {
            console.log(that.body);
            request.post(that.options.url, { json: that.body }, (err, resp, body) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(body);
                    resolve(body);
                }
            });
        });
    }
}
