"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Authenticator = /** @class */ (function () {
    /**
     *
     */
    function Authenticator(Auth) {
        this.Auth = Auth;
    }
    Authenticator.prototype.isValid = function () {
        var user = this.checkUser(this.Auth.username);
        return user.username == this.Auth.username && user.password == this.Auth.password;
    };
    Authenticator.prototype.checkUser = function (username) {
        // TODO modify later to check from DB
        return {
            username: "testOPENDB",
            password: "PASSWOEDOPENDB"
        };
    };
    return Authenticator;
}());
exports.Authenticator = Authenticator;
