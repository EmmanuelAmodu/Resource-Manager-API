import { OpenDBConnector } from '../../OpenDBConnector/OpenDBConnector';

export class FormService {

    constructor(private params: any){}

    public get formData () {
        return this.getFormData();
    }

    private openDB(table: string, body: any): OpenDBConnector {
        return new OpenDBConnector(table, body);
    }

    private getFormData() {
        return new Promise<any>((resolve, reject) => {
            this.openDB("formData", {formname: this.params.formname}).read().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    public setFormData() {
        return new Promise<any>((resolve, reject) => {
            this.openDB("formData", this.params).create().then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
}
