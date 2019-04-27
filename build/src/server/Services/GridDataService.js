"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../Providers/OpenDBConnector");
class GridDataService extends OpenDBConnector_1.OpenDBConnector {
    constructor(params) {
        super();
        this.params = params;
    }
    get data() {
        return this.getData();
    }
    getData() {
        return new Promise((resolve, reject) => {
            this.read(this.params.entity, this.params.query)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
}
exports.GridDataService = GridDataService;
//# sourceMappingURL=GridDataService.js.map