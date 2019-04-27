"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenDBConnector_1 = require("../Providers/OpenDBConnector");
class FormService extends OpenDBConnector_1.OpenDBConnector {
    constructor(params) {
        super();
        this.params = params;
    }
    get formData() {
        return this.getFormDataField();
    }
    getFormDataField() {
        return new Promise((resolve, reject) => {
            this.read("formData", { form_name: this.params.form_name }).then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
    setFormDataField() {
        return new Promise((resolve, reject) => {
            this.create("formData", this.params).then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
    saveFormData() {
        return new Promise((resolve, reject) => {
            this.create(this.params.data_model, this.params.data).then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
    getFormData() {
        return new Promise((resolve, reject) => {
            this.read(this.params.data_model, this.params.data).then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
}
exports.FormService = FormService;
//# sourceMappingURL=FormService.js.map