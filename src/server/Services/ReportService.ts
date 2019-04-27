import * as fs from 'fs';
import * as path from 'path';
import { OpenDBConnector } from '../Providers/OpenDBConnector';
import { ExcelFileGenerator } from '../Providers/ExcelFileGenerator';

export class ReportService extends OpenDBConnector {
    private efg: ExcelFileGenerator;

    constructor(private params: any){
        super()
    }

    private getData() {
        return new Promise<any>((resolve, reject) => {
            // TODO Change implementation to get from db not file
            const filePath = path.join(__dirname + '../../../../../Documents/posts.json');
            fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    private makeFile() {
        const reportID = this.genOrderid("RPT")
        return new Promise<any>((resolve, reject) => {
            this.getData().then(data => {
                this.efg = new ExcelFileGenerator(reportID, {
                    "userId": "User ID",
                    "id": "ID",
                    "title": "Title",
                    "body": "Content"
                }, JSON.parse(data));
                
                this.efg.file
                    .then(file => resolve(file))
                        .catch(err => reject(err));

            }).catch(err => reject(err));
        });
    }

    get file() {
        return this.makeFile();
    }

    private genOrderid(pre: string) {
        const date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        month_str = month > 10 ? month : "0" + month,
        day = date.getDate(),
        day_str = day > 10 ? day : "0" + day,
        secs = (date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds();
        return  pre + "-" + year + "" + month_str + "" + day_str  + "-" + secs;
    }

}