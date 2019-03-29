"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../../OpenDBConnector/OpenDBConnector");
class FormService {
    constructor(params) {
        this.params = params;
    }
    get formData() {
        return this.getFormData();
    }
    openDB(table, body) {
        return new OpenDBConnector_1.OpenDBConnector(table, body);
    }
    getFormData() {
        return new Promise((resolve, reject) => {
            this.openDB("formData", { formname: this.params.formname }).read().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
    setFormData() {
        return new Promise((resolve, reject) => {
            this.openDB("formData", this.params).create().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
}
exports.FormService = FormService;
