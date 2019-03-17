import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';
import { UserToken } from '../Model/Interface';
import * as crypto from 'crypto';

export class AuthenticationService {
    public userDetails: Promise<any>;
    public auth: any = {
        "username": "EAmodu",
        "password": "gyuftydycfgxgf"
    };

    constructor(/*private auth: any*/){}

    private openDB(table: string, body: any): OpenDBConnector {
        const openDB: OpenDBConnector = new OpenDBConnector(table, body);
        return openDB;
    }

    public login() {
        const that = this;
        return new Promise<any>(function(resolve, reject) {
            that.openDB('usertable', that.auth).read().then(res => {
                if (res[0].username == that.auth.username) {
                    that.getToken({username: res[0].username}).then(tokenInfo => {
                        resolve(tokenInfo);
                    }).catch(err => reject({"error 1": err}));
                }
                else reject({"status": "login failed"});
            }).catch(err => reject({"error 2": err}));
        })
    }

    public logout() {
        return new Promise<any>(function(resolve, reject) {
            this.deleteToken(this.auth).then(res => {
                resolve(res);
            }).catch(err => {
                reject({"status": "login failed"});
            });
        });
    }

    private getToken(update: any): Promise<UserToken> {
        const that = this;
        return new Promise<UserToken>(function(resolve, reject) {
            that.openDB("usertoken", update)
                .read().then(data => {
                    console.log(data);
                    if(data.length == 1) {
                        let expiry = parseInt(data[0].expiry);
                        new Date().getTime() >= expiry ? 
                            that.deleteToken(data[0], that.setToken).then(e => {
                                resolve(e);
                            }).catch(err => reject({"status": "login failed at deleteToken(), please try again"})) :
                            resolve(data)
                    }
                    else if (data.length > 1) that.deleteToken(data[0]);
                    else if (data.length == 0) {
                        that.setToken(update).then(res => {resolve(res)}).catch((err => reject(err)));
                    }
                }).catch(err => reject({"status": "login failed at getToken(), please try again"}));
        });
    }

    private deleteToken(usertoken: UserToken, callback?) {
        const that = this;
        return new Promise<UserToken>(function(resolve, reject) {
            that.openDB("usertoken", usertoken)
                .delete().then(mes => {
                    if (callback) {
                        callback(usertoken).then(d => {
                            console.log(d)
                            d.ok == 1 ? resolve(d) : reject({"faled": "re"});
                        }).catch(err => reject({"status": "login failed at callback(), please try again"}));
                    }
                    resolve(usertoken);
                });
        });
    }

    private setToken(usertoken: { username?: string; expiry?: any; token?: any; }) {
        const that = this;
        return new Promise<any>(function(resolve, reject) { 
            crypto.randomBytes(48, function(err, buffer) {
                usertoken.expiry = (new Date().getTime() + (4 * 60 * 60 * 1000)).toString();
                usertoken.token = buffer.toString('hex');
                console.log(usertoken);
                that.openDB("usertoken", usertoken).create().then(res => {
                    if (res.ok == 1) resolve(usertoken);
                }).catch(err => reject({"status": "login failed at setToken(), please try again", err: err}));
            });
        });
    }
}
