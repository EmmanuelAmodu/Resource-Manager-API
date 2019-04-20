"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../../OpenDBConnector/OpenDBConnector");
const crypto = require("crypto");
class AuthenticationService extends OpenDBConnector_1.OpenDBConnector {
    constructor(auth) {
        super();
        this.auth = auth;
    }
    get userData() {
        return this.getUserDetails();
    }
    get isloggedIn() {
        return this.checkIfLoggedIn();
    }
    login() {
        return new Promise((resolve, reject) => {
            this.userDetail().then(res => {
                if (res[0].username == this.auth.username) {
                    this.getToken({ username: res[0].username }).then(tokenInfo => {
                        resolve(tokenInfo);
                    }).catch(err => reject({ "error 1": err }));
                }
                else
                    reject({ "status": "login failed" });
            }).catch(err => reject({ "error 2": err }));
        });
    }
    logout(usertoken) {
        return new Promise((resolve, reject) => {
            this.deleteToken(usertoken || this.auth).then(res => {
                resolve({ "status": true });
            }).catch(err => {
                reject({ "status": false });
            });
        });
    }
    createUser() {
        return new Promise((resolve, reject) => {
            this.checkUserExist(["email", "username"]).then(res => {
                this.auth._id = this.auth.username;
                this.auth.isConfimed = false;
                res ? this.create('usertable', this.auth)
                    .then(res => resolve(res))
                    .catch(res => reject(res))
                    : resolve(false);
            }).catch(err => reject(err));
        });
    }
    checkUserExist(properties) {
        const userObj = properties.map(e => {
            return { [e]: this.auth[e] };
        });
        return new Promise((resolve, reject) => {
            this.read('usertable', { $or: userObj })
                .then(res => res == 0 ? resolve(true) : resolve(false))
                .catch(err => reject(err));
        });
    }
    getUserDetails() {
        return new Promise((resolve, reject) => {
            this.isloggedIn.then(res => {
                res ? this.read('usertable', { username: this.auth.username })
                    .then(res => resolve(res))
                    .catch(err => reject(err)) :
                    reject({ "err": "authentication failed" });
            }).catch(err => reject({ "err": "error getting userdetails" }));
        });
    }
    userDetail() {
        return new Promise((resolve, reject) => {
            this.read('usertable', this.auth)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
    checkIfLoggedIn() {
        return new Promise((resolve, reject) => {
            this.auth.token && this.auth.token.length > 0 ?
                this.read("usertoken", this.auth).then(res => {
                    if (res.length > 0) {
                        this.validateToken({ username: this.auth.username }, res)
                            .then(resp => {
                            resp[0].token == this.auth.token ? resolve({ status: true }) : reject({ status: false });
                        }).catch(err => reject(err));
                    }
                    else
                        reject({ status: false });
                }).catch(err => reject(err)) : reject({ "err": "token not defined" });
        });
    }
    getToken(update) {
        return new Promise((resolve, reject) => {
            this.read("usertoken", update).then(data => {
                this.validateToken(update, data)
                    .then(res => resolve(res))
                    .catch(err => reject({ "status": "login failed at getToken() while validateToken(), please try again", err: err }));
            }).catch(err => reject(err));
        });
    }
    validateToken(update, data) {
        return new Promise((resolve, reject) => {
            if (data.length == 1) {
                let expiry = parseInt(data[0].expiry);
                if (new Date().getTime() >= expiry) {
                    this.logout(update)
                        .then(res => resolve(res))
                        .catch(res => reject({ "err": "error validating user" }));
                }
                else
                    resolve(data);
            }
            else if (data.length > 1) {
                this.deleteToken(update).then(dres => {
                    this.setToken(update).then(res => {
                        resolve(res);
                    }).catch(err => reject({ "status": "login failed at getToken(), there is more than one token for this user, trying to delete all and set another one" }));
                }).catch(err => reject({ "status": "login failed at getToken(), there is more than one token for this user, trying to delete all" }));
                ;
            }
            else if (data.length == 0) {
                this.setToken(update).then(res => { resolve(res); }).catch((err => reject(err)));
            }
        });
    }
    deleteToken(usertoken) {
        return new Promise((resolve, reject) => {
            this.delete("usertoken", usertoken)
                .then(mes => resolve(usertoken))
                .catch(err => reject(err));
        });
    }
    setToken(userdetail) {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(48, (err, buffer) => {
                userdetail._id = userdetail.username;
                userdetail.expiry = new Date().getTime() + (4 * 60 * 60 * 1000);
                userdetail.token = buffer.toString('hex');
                this.create("usertoken", userdetail).then(res => {
                    if (res.ok == 1)
                        resolve([userdetail]);
                }).catch(err => reject({ "status": "login failed at setToken(), please try again", err: err }));
            });
        });
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map