import { Workbook } from 'excel4node';
import * as fs from 'fs';
import * as path from 'path';

export class ExcelFileGenerator {
    private workbook: Workbook;
    private headerStyle: any;

    constructor(
        private fileName: string, 
        private header: any,
        private JSONData: any[]
    ) {
        this.workbook = new Workbook();
        this.headerStyle = this.workbook.createStyle({
            font: {
                color: '#FF0800',
                size: 12,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -'
        });
    }

    private writeDataToExcel(): Promise<string> {
        this.setExcelValues('Sheet 1');
        return new Promise<any>((resolve, reject) => {
            this.workbook.writeToBuffer().then((buffer: Buffer) => {
                const filePath = path.join(__dirname + "../../../../../Documents/" + this.fileName);
                const fileName = filePath + '.xlsx' 
                const wstream = fs.createWriteStream(fileName);
                wstream.write(buffer, (err) => {
                    if (!err) resolve(fileName);
                    else reject(err);
                });
                wstream.end();
            });
        });
    }

    get file() {
        return this.writeDataToExcel();
    }
    
    private setExcelValues(sheetName: string) {
        const ws = this.workbook.addWorksheet(sheetName);
        const headerkey = Object.keys(this.header);
        const headerBody = headerkey.map(e => this.header[e]);

        for (let i = 1; i <= headerkey.length; i++) {
            ws.cell(1, i)
                .string(headerBody[i - 1])
                    .style(this.headerStyle);
        }

        for (let i = 2, len = this.JSONData.length + 1; i <= len; i++) {
            for (let j = 1; j <= headerkey.length; j++) {
                ws.cell(i, j)
                    .string(this.JSONData[i - 2][headerkey[j - 1]].toString());
            }
        }
        return ws;
    }
}
