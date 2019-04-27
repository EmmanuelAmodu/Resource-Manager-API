"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../Providers/OpenDBConnector");
class RoleManager extends OpenDBConnector_1.OpenDBConnector {
    /**
     *
     */
    constructor(user) {
        super();
        this.user = user;
    }
}
//# sourceMappingURL=RoleManager.js.map