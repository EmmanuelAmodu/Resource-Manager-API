"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../../OpenDBConnector/OpenDBConnector");
const crypto = require("crypto");
class AuthenticationService {
    constructor(auth) {
        this.auth = auth;
    }
    get userDetails() {
        return this.getUserDetails();
    }
    openDB(table, body) {
        const openDB = new OpenDBConnector_1.OpenDBConnector(table, body);
        return openDB;
    }
    getUserDetails() {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.openDB('usertable', that.auth).read().then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    login() {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.getUserDetails().then(res => {
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
    checkIfLoggedIn(usertoken) {
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
            console.log(data, data.length);
            if (data.length == 1) {
                let expiry = parseInt(data[0].expiry);
                console.log("new Date().getTime() >= expiry", new Date().getTime() >= expiry);
                if (new Date().getTime() >= expiry) {
                    that.logout(update).then(res => {
                        resolve({ "err": "token expired" });
                    });
                }
                else
                    resolve(data);
            }
            else if (data.length > 1) {
                that.deleteToken(update).then(dres => {
                    console.log("dres", dres);
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
    deleteToken(usertoken, callback) {
        console.log("delete");
        const that = this;
        return new Promise(function (resolve, reject) {
            that.openDB("usertoken", usertoken).delete().then(mes => {
                resolve(usertoken);
            });
        });
    }
    setToken(usertoken) {
        const that = this;
        return new Promise(function (resolve, reject) {
            crypto.randomBytes(48, function (err, buffer) {
                usertoken.expiry = new Date().getTime() + (4 * 60 * 60 * 1000);
                usertoken.token = buffer.toString('hex');
                console.log(usertoken);
                that.openDB("usertoken", usertoken).create().then(res => {
                    if (res.ok == 1)
                        resolve(usertoken);
                }).catch(err => reject({ "status": "login failed at setToken(), please try again", err: err }));
            });
        });
    }
}
exports.AuthenticationService = AuthenticationService;
