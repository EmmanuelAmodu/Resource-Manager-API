import { OpenDBConnector } from '../Providers/OpenDBConnector';

export class FormService extends OpenDBConnector  {

    constructor(private params: any){
        super()
    }

    public get formData () {
        return this.getFormDataField();
    }

    private getFormDataField() {
        return new Promise<any>((resolve, reject) => {
            this.read("formData", {form_name: this.params.form_name}).then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    public setFormDataField() {
        return new Promise<any>((resolve, reject) => {
            this.create("formData", this.params).then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    protected saveFormData() {
        return new Promise<any>((resolve, reject) => {
            this.create(this.params.data_model, this.params.data).then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    public getFormData() {
        return new Promise<any>((resolve, reject) => {
            this.read(this.params.data_model, this.params.data).then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }
}
