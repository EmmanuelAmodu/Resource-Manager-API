"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../../OpenDBConnector/OpenDBConnector");
const AuthenticationService_1 = require("./AuthenticationService");
class PermissionManager {
    /**
     *
     */
    constructor(auth) {
        this.auth = auth;
        this.isLoggedIn = new AuthenticationService_1.AuthenticationService(this.auth).isloggedIn;
    }
    ;
    get isPermitted() {
        return null;
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
