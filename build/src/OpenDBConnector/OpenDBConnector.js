"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class OpenDBConnector {
    constructor(modelName, body) {
        this.modelName = modelName;
        this.body = body;
        this.options = {
            url: 'http://localhost:8900/api/',
            auth: {
                'user': 'testOPENDB',
                'pass': 'PASSWOEDOPENDB',
                'sendImmediately': false
            }
        };
    }
    create() {
        return this.operate("create");
    }
    read() {
        return this.operate("read");
    }
    update() {
        return this.operate("update");
    }
    delete() {
        return this.operate("delete");
    }
    operate(action) {
        this.options.body = this.body;
        this.options.url = this.options.url + action + '/' + this.modelName;
        const that = this;
        return new Promise(function (resolve, reject) {
            request.post(that.options.url, { json: that.body }, (err, resp, body) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        });
    }
}
exports.OpenDBConnector = OpenDBConnector;
