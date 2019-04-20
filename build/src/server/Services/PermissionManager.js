"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../../OpenDBConnector/OpenDBConnector");
// TODO DESIGN this class logic
class PermissionManager extends OpenDBConnector_1.OpenDBConnector {
    /**
     *
     */
    constructor(username, path) {
        super();
        this.username = username;
        this.path = path;
    }
    isPermitted() {
        // TODO implement is permitted
        return true;
    }
    setPermission() {
    }
    deletePermission() {
    }
    getPermission() {
    }
}
exports.PermissionManager = PermissionManager;
//# sourceMappingURL=PermissionManager.js.map