"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../../OpenDBConnector/OpenDBConnector");
class GridDataService {
    constructor(params) {
        this.params = params;
    }
    openDB(table, body) {
        return new OpenDBConnector_1.OpenDBConnector(table, body);
    }
    get data() {
        return this.getData();
    }
    getData() {
        return new Promise((resolve, reject) => {
            this.openDB(this.params.entity, this.params.query).read()
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
}
exports.GridDataService = GridDataService;
