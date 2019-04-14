import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';

export class FormService {

    constructor(private params: any){}

    public get formData () {
        return this.getFormDataField();
    }

    private openDB(table: string, body: any): OpenDBConnector {
        return new OpenDBConnector(table, body);
    }

    private getFormDataField() {
        return new Promise<any>((resolve, reject) => {
            this.openDB("formData", {form_name: this.params.form_name}).read().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    public setFormDataField() {
        return new Promise<any>((resolve, reject) => {
            this.openDB("formData", this.params).create().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    public saveFormData() {
        return new Promise<any>((resolve, reject) => {
            this.openDB(this.params.data_model, this.params.data).create().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    public getFormData() {
        return new Promise<any>((resolve, reject) => {
            this.openDB(this.params.data_model, this.params.data).read().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
}
