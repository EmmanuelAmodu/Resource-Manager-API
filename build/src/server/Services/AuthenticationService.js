"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../../OpenDBConnector/OpenDBConnector");
const crypto = require("crypto");
class AuthenticationService {
    constructor(auth) {
        this.auth = auth;
    }
    openDB(table, body) {
        const openDB = new OpenDBConnector_1.OpenDBConnector(table, body);
        return openDB;
    }
    getUserDetails() {
    }
    login() {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.openDB('usertable', that.auth).read().then(res => {
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
    logout() {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.deleteToken(that.auth).then(res => {
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
                console.log(data, data.length);
                if (data.length == 1) {
                    let expiry = parseInt(data[0].expiry);
                    console.log("new Date().getTime() >= expiry", new Date().getTime() >= expiry);
                    new Date().getTime() >= expiry ?
                        that.deleteToken(data[0], that.setToken.bind(that)).then(e => {
                            resolve(e);
                        }).catch(err => reject({ "status": "login failed at deleteToken(), please try again" })) :
                        resolve(data);
                }
                else if (data.length > 1) {
                    that.deleteToken(data).then(res => {
                        that.setToken(update).then(res => {
                            resolve(res);
                        }).catch(err => reject({ "status": "login failed at getToken(), there is more than one token for this user, trying to delete all and set another one" }));
                    }).catch(err => reject({ "status": "login failed at getToken(), there is more than one token for this user, trying to delete all" }));
                    ;
                }
                else if (data.length == 0) {
                    that.setToken(update).then(res => { resolve(res); }).catch((err => reject(err)));
                }
            }).catch(err => reject({ "status": "login failed at getToken(), please try again" }));
        });
    }
    deleteToken(usertoken, callback) {
        console.log("delete");
        const that = this;
        return new Promise(function (resolve, reject) {
            that.openDB("usertoken", usertoken)
                .delete().then(mes => {
                if (callback) {
                    callback(usertoken).then(d => {
                        console.log(d);
                        d.ok == 1 ? resolve(d) : reject({ "faled": "re" });
                    }).catch(err => reject({ "status": "login failed at callback(), please try again" }));
                }
                resolve(usertoken);
            });
        });
    }
    setToken(usertoken) {
        const that = this;
        return new Promise(function (resolve, reject) {
            crypto.randomBytes(48, function (err, buffer) {
                usertoken.expiry = (new Date().getTime() + (4 * 60 * 60 * 1000)).toString();
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
