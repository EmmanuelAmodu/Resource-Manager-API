import { Workbook } from 'excel4node';
import * as fs from 'fs';
import * as path from 'path';

export class ExcelFileGenerator {
    private workbook: Workbook;
    private headerStyle: any;

    constructor(public fileName: string) {
        this.workbook = new Workbook();
        this.headerStyle = this.workbook.createStyle({
            font: {
                color: '#FF0800',
                size: 12,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        });
    }

    public writeDataToExcel() {
        this.setExcelValues('Sheet 1', {});
        
        return new Promise<any>((resolve, reject) => {
            this.workbook.writeToBuffer().then((buffer: Buffer) => {
                var wstream = fs.createWriteStream(this.fileName + '.xlsx');
                wstream.write(buffer, (err) => {
                    if (!err) resolve(path.join(__dirname + "../../../../../" + wstream.path));
                    reject(err);
                });
                wstream.end();
            });
        });
    }
    
    private setExcelValues(sheetName, json = {}) {
        const ws = this.workbook.addWorksheet(sheetName);
        ws.cell(1, 1).number(100).style(this.headerStyle);
        ws.cell(1, 2).number(200);
        ws.cell(1, 3).formula('A1 + B1');
        ws.cell(2, 1).string('string');
        ws.cell(3, 1).bool(true)
        return ws;
    }
}
