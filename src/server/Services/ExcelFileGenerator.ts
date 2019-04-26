import { Workbook } from 'excel4node';
import * as fs from 'fs';
import * as path from 'path';

export class ExcelFileGenerator {
    private workbook: Workbook;

    constructor(datamodel: string, query: {}) {
        this.workbook = new Workbook();
    }

    public writeDataToExcel() {
        const style = this.workbook.createStyle({
          font: {
            color: '#FF0800',
            size: 12,
          },
          numberFormat: '$#,##0.00; ($#,##0.00); -',
        });
         
        this.setExcelValues('Sheet 1', style, {})
        
        return new Promise<any>((resolve, reject) => {
            this.workbook.writeToBuffer().then(function(buffer: Buffer) {
                var wstream = fs.createWriteStream('Excel2.xlsx');
                wstream.write(buffer, (err) => {
                    if (!err) resolve(path.join(__dirname + "../../../../../" + wstream.path));
                    reject(err);
                });
                wstream.end();
            });
        });
    }
    
    private setExcelValues(sheetName, style, json) {
        const ws = this.workbook.addWorksheet(sheetName);
        ws.cell(1, 1).number(100).style(style);
        ws.cell(1, 2).number(200);
        ws.cell(1, 3).formula('A1 + B1');
        ws.cell(2, 1).string('string');
        ws.cell(3, 1).bool(true)
        return ws;
    }
}
