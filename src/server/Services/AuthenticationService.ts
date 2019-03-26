import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';
import { UserToken } from '../Model/Interface';
import * as crypto from 'crypto';

export class AuthenticationService {

    constructor(private auth: any){}

    public get userData() {
        return this.getUserDetails();
    }

    public get isloggedIn() {
        return this.checkIfLoggedIn();
    }

    public login() {
        return new Promise<any>((resolve, reject) => {
            this.userDetail().then(res => {
                if (res[0].username == this.auth.username) {
                    this.getToken({username: res[0].username}).then(tokenInfo => {
                        resolve(tokenInfo);
                    }).catch(err => reject({"error 1": err}));
                }
                else reject({"status": "login failed"});
            }).catch(err => reject({"error 2": err}));
        })
    }

    public logout(usertoken?) {
        return new Promise<any>((resolve, reject) => {
            this.deleteToken(usertoken || this.auth).then(res => {
                resolve(res);
            }).catch(err => {
                reject({"status": "login failed"});
            });
        });
    }

    public createUser() {
        return new Promise<boolean>((resolve, reject) => {
            this.openDB('usertable', this.auth).create()
                .then(res => resolve(true))
                .catch(res => reject(res))
        });
    }

    private openDB(table: string, body: any): OpenDBConnector {
        return new OpenDBConnector(table, body);
    }

    private getUserDetails(){
        return new Promise<any>((resolve, reject) => {
            this.isloggedIn.then(res => {
                res ? this.openDB('usertable', {username: this.auth.username}).read()
                .then(res => resolve(res))
                    .catch(err => reject(err)) :
                reject({"err": "authentication failed"});
            }).catch(err => reject({"err": "error getting userdetails"}));
        });
    }

    private userDetail(){
        return new Promise<any>((resolve, reject) => {
            this.openDB('usertable', this.auth).read()
                .then(res => resolve(res))
                    .catch(err => reject(err));
        });
    }

    private checkIfLoggedIn() {
        return new Promise<{status:boolean}>((resolve, reject) => {
            this.auth.token.length > 0 ?
            this.openDB("usertoken", this.auth).read().then(res => {
                if (res.length > 0) {
                    this.validateToken({username: this.auth.username}, res)
                    .then(resp => {
                        resp[0].token == this.auth.token ? resolve({status:true}) : reject({status:false});
                    }).catch(err =>  reject(err));
                } else reject({status:false});
            }).catch(err =>  reject(err)) : reject({"err": "token not defined"});
        });
    }

    private getToken(update: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.openDB("usertoken", update)
                .read().then(data => {
                    this.validateToken(update, data).then(res => {
                        resolve(res);
                    }).catch(err => reject({"status": "login failed at getToken(), please try again"}));
                }).catch(err => reject({"status": "login failed at getToken(), please try again"}));
        });
    }

    private validateToken(update, data) {
        return new Promise<any>((resolve, reject) => {
            if(data.length == 1) {
                let expiry = parseInt(data[0].expiry);
                if (new Date().getTime() >= expiry) {
                    this.logout(update)
                        .then(res => reject({"err": "token expired"}))
                            .catch(res => reject({"err": "error validating user"}));
                } else resolve(data);
            }
            else if (data.length > 1) {
                this.deleteToken(update).then(dres => {
                    this.setToken(update).then(res => {
                        resolve(res);
                    }).catch(err => reject({"status": "login failed at getToken(), there is more than one token for this user, trying to delete all and set another one"}));
                }).catch(err => reject({"status": "login failed at getToken(), there is more than one token for this user, trying to delete all"}));;
            }
            else if (data.length == 0) {
                this.setToken(update).then(res => {resolve(res)}).catch((err => reject(err)));
            }
        });
    }

    private deleteToken(usertoken: any) {
        return new Promise<UserToken>((resolve, reject) => {
            this.openDB("usertoken", usertoken).delete()
                .then(mes => resolve(usertoken))
                    .catch(err => reject(err));
        });
    }

    private setToken(userdetail: any) {
        return new Promise<any>((resolve, reject) => { 
            crypto.randomBytes(48, (err, buffer) => {
                userdetail.expiry = new Date().getTime() + (4 * 60 * 60 * 1000)
                userdetail.token = buffer.toString('hex');
                this.openDB("usertoken", userdetail).create().then(res => {
                    if (res.ok == 1) resolve(userdetail);
                }).catch(err => reject({"status": "login failed at setToken(), please try again", err: err}));
            });
        });
    }
}
