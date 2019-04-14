"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../../OpenDBConnector/OpenDBConnector");
class FormService {
    constructor(params) {
        this.params = params;
    }
    get formData() {
        return this.getFormDataField();
    }
    openDB(table, body) {
        return new OpenDBConnector_1.OpenDBConnector(table, body);
    }
    getFormDataField() {
        return new Promise((resolve, reject) => {
            this.openDB("formData", { form_name: this.params.form_name }).read().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
    setFormDataField() {
        return new Promise((resolve, reject) => {
            this.openDB("formData", this.params).create().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
    saveFormData() {
        return new Promise((resolve, reject) => {
            this.openDB(this.params.data_model, this.params.data).create().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
    getFormData() {
        return new Promise((resolve, reject) => {
            this.openDB(this.params.data_model, this.params.data).read().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
}
exports.FormService = FormService;
