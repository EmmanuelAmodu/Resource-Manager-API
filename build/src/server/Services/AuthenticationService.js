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
        const that = this;
        return new Promise(function (resolve, reject) {
            that.userDetail().then(res => {
                if (res[0].username == that.auth.username) {
                    that.getToken({ username: res[0].username }).then(tokenInfo => {
                        resolve(tokenInfo);
                    }).catch(err => reject({ "error 1": err }));
                }
                else
                    reject({ "status": "login failed" });
            }).catch(err => reject({ "error 2": err }));
        });
    }
    logout(usertoken) {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.deleteToken(usertoken || that.auth).then(res => {
                resolve(res);
            }).catch(err => {
                reject({ "status": "login failed" });
            });
        });
    }
    openDB(table, body) {
        return new OpenDBConnector_1.OpenDBConnector(table, body);
    }
    createUser() {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.openDB('usertable', that.auth).create()
                .then(res => resolve(true))
                .catch(res => reject(res));
        });
    }
    getUserDetails() {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.isloggedIn.then(res => {
                res ? that.openDB('usertable', { username: that.auth.username }).read()
                    .then(res => resolve(res))
                    .catch(err => reject(err)) :
                    reject({ "err": "authentication failed" });
            }).catch(err => reject({ "err": "error getting userdetails" }));
        });
    }
    userDetail() {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.openDB('usertable', that.auth).read()
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
    checkIfLoggedIn() {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.auth.token ?
                that.validateToken({ username: that.auth.username }, [that.auth])
                    .then(res => {
                    res[0].username == that.auth.username ? resolve(true) : resolve(false);
                }).catch(err => reject(err)) : reject({ "err": "token not defined" });
        });
    }
    getToken(update) {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.openDB("usertoken", update)
                .read().then(data => {
                that.validateToken(update, data).then(res => {
                    resolve(res);
                }).catch(err => reject({ "status": "login failed at getToken(), please try again" }));
            }).catch(err => reject({ "status": "login failed at getToken(), please try again" }));
        });
    }
    validateToken(update, data) {
        const that = this;
        return new Promise(function (resolve, reject) {
            if (data.length == 1) {
                let expiry = parseInt(data[0].expiry);
                if (new Date().getTime() >= expiry) {
                    that.logout(update)
                        .then(res => reject({ "err": "token expired" }))
                        .catch(res => reject({ "err": "error validating user" }));
                }
                else
                    resolve(data);
            }
            else if (data.length > 1) {
                that.deleteToken(update).then(dres => {
                    that.setToken(update).then(res => {
                        resolve(res);
                    }).catch(err => reject({ "status": "login failed at getToken(), there is more than one token for this user, trying to delete all and set another one" }));
                }).catch(err => reject({ "status": "login failed at getToken(), there is more than one token for this user, trying to delete all" }));
                ;
            }
            else if (data.length == 0) {
                that.setToken(update).then(res => { resolve(res); }).catch((err => reject(err)));
            }
        });
    }
    deleteToken(usertoken) {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.openDB("usertoken", usertoken).delete()
                .then(mes => resolve(usertoken))
                .catch(err => reject(err));
        });
    }
    setToken(usertoken) {
        const that = this;
        return new Promise(function (resolve, reject) {
            crypto.randomBytes(48, function (err, buffer) {
                usertoken.expiry = new Date().getTime() + (4 * 60 * 60 * 1000);
                usertoken.token = buffer.toString('hex');
                that.openDB("usertoken", usertoken).create().then(res => {
                    if (res.ok == 1)
                        resolve(usertoken);
                }).catch(err => reject({ "status": "login failed at setToken(), please try again", err: err }));
            });
        });
    }
}
exports.AuthenticationService = AuthenticationService;
