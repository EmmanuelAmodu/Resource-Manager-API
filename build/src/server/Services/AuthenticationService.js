"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../../OpenDBConnector/OpenDBConnector");
const crypto = require("crypto");
class AuthenticationService {
    constructor(auth) {
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
                resolve(res);
            }).catch(err => {
                reject({ "status": "login failed" });
            });
        });
    }
    createUser() {
        return new Promise((resolve, reject) => {
            this.openDB('usertable', this.auth).create()
                .then(res => resolve(true))
                .catch(res => reject(res));
        });
    }
    openDB(table, body) {
        return new OpenDBConnector_1.OpenDBConnector(table, body);
    }
    getUserDetails() {
        return new Promise((resolve, reject) => {
            this.isloggedIn.then(res => {
                res ? this.openDB('usertable', { username: this.auth.username }).read()
                    .then(res => resolve(res))
                    .catch(err => reject(err)) :
                    reject({ "err": "authentication failed" });
            }).catch(err => reject({ "err": "error getting userdetails" }));
        });
    }
    userDetail() {
        return new Promise((resolve, reject) => {
            this.openDB('usertable', this.auth).read()
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
    checkIfLoggedIn() {
        return new Promise((resolve, reject) => {
            this.auth.token.length > 0 ?
                this.getToken({ username: this.auth.username, token: this.auth.token }).then(res => {
                    this.validateToken({ username: this.auth.username }, res)
                        .then(res => {
                        res[0].token == this.auth.token ? resolve(true) : resolve(false);
                        console.log("checkIfLoggedIn---> 3", res);
                    }).catch(err => reject(err));
                }).catch(err => reject(err)) : reject({ "err": "token not defined" });
        });
    }
    getToken(update) {
        return new Promise((resolve, reject) => {
            this.openDB("usertoken", update)
                .read().then(data => {
                this.validateToken(update, data).then(res => {
                    resolve(res);
                }).catch(err => reject({ "status": "login failed at getToken(), please try again" }));
            }).catch(err => reject({ "status": "login failed at getToken(), please try again" }));
        });
    }
    validateToken(update, data) {
        return new Promise((resolve, reject) => {
            if (data.length == 1) {
                let expiry = parseInt(data[0].expiry);
                if (new Date().getTime() >= expiry) {
                    this.logout(update)
                        .then(res => reject({ "err": "token expired" }))
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
            this.openDB("usertoken", usertoken).delete()
                .then(mes => resolve(usertoken))
                .catch(err => reject(err));
        });
    }
    setToken(usertoken) {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(48, (err, buffer) => {
                usertoken.expiry = new Date().getTime() + (4 * 60 * 60 * 1000);
                usertoken.token = buffer.toString('hex');
                this.openDB("usertoken", usertoken).create().then(res => {
                    if (res.ok == 1)
                        resolve(usertoken);
                }).catch(err => reject({ "status": "login failed at setToken(), please try again", err: err }));
            });
        });
    }
}
exports.AuthenticationService = AuthenticationService;
