"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class OpenDBConnector {
    constructor() {
        this.options = {
            auth: {
                'user': 'testOPENDB',
                'pass': 'PASSWOEDOPENDB',
                'sendImmediately': false
            }
        };
    }
    create(collection, query) {
        this.collection = collection;
        this.body = query;
        return this.operate("create");
    }
    read(collection, query) {
        this.collection = collection;
        this.body = query;
        return this.operate("read");
    }
    update(collection, query) {
        this.collection = collection;
        this.body = query;
        return this.operate("update");
    }
    delete(collection, query) {
        this.collection = collection;
        this.body = query;
        return this.operate("delete");
    }
    url(action) {
        return 'http://localhost:8900/api/' + action + '/' + this.collection;
    }
    operate(action) {
        this.options.body = this.body;
        return new Promise((resolve, reject) => {
            request.post(this.url(action), { json: this.body }, (err, resp, body) => err ? reject(err) : resolve(body));
        });
    }
}
exports.OpenDBConnector = OpenDBConnector;
//# sourceMappingURL=OpenDBConnector.js.map