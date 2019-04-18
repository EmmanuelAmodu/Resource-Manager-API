import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';

export class ProductRequestService {
    constructor(private params: any) {
    }

    public statusCode = 200;

    private openDB(table: string, body: any): OpenDBConnector {
        return new OpenDBConnector(table, body);
    }

    public makeRequest() {
        return this.request();
    }

    public get getRequest() {
        return this.pendingRequest(this.params.data_model, {});
    }

    private pendingRequest(data_model: string, query: any) {
        return new Promise<any>((resolve, reject) => {
            this.openDB(data_model, query).read()
                .then(res => resolve(res))
                    .catch(err => reject(err));
        });
    }

    private genOrderid() {
        const date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        month_str = month > 10 ? month : "0" + month,
        day = date.getDate(),
        day_str = day > 10 ? day : "0" + day,
        secs = (date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds();
        return  year + "" + month_str + "" + day_str  + "-" + secs;
    }

    private request() {
        return new Promise<any>((resolve, reject) => {
            const productType = this.params.data.product_type;
            this.pendingRequest(this.params.data_model, {product_type: productType}).then(res => {
                if (res.length === 0) {
                    this.params.data._id = 'REQ-' + this.genOrderid();
                    this.params.data.orderid = this.params.data._id;
                    this.params.data.status = 'initiated';
                    console.log(this.params.data);
                    this.openDB(this.params.data_model, this.params.data).create()
                        .then(res => resolve(res))
                        .catch(err => {
                            this.statusCode = 500;
                            reject(err)
                        })
                } else {
                    this.statusCode = 409;
                    reject({"message": "There is a pending request for this product", "error_code": "E0002"});
                }

            }).catch(err => {
                this.statusCode = 500;
                reject({"message": "1Error processing request", "error_code": "E0001"});
            });
        });
    }
}
