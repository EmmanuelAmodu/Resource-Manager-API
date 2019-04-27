import * as fs from 'fs';
import * as path from 'path';
import { OpenDBConnector } from '../Providers/OpenDBConnector';
import { ExcelFileGenerator } from '../Providers/ExcelFileGenerator';
import { GenOrderid } from '../Providers/IDSequenceGenerator';

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
        const reportID = GenOrderid("RPT");
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
}