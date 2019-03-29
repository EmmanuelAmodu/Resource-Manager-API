"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../../OpenDBConnector/OpenDBConnector");
// TODO DESIGN this class logic
class PermissionManager {
    /**
     *
     */
    constructor(username, path) {
        this.username = username;
        this.path = path;
    }
    isPermitted() {
        // TODO implement is permitted
        return true;
    }
    openDB(table, body) {
        return new OpenDBConnector_1.OpenDBConnector(table, body);
    }
    setPermission() {
    }
    deletePermission() {
    }
    getPermission() {
    }
}
exports.PermissionManager = PermissionManager;
