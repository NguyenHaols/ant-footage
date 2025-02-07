import Excel, { Alignment } from 'exceljs';
import { saveAs } from 'file-saver';

const ROW_FREEZE = 1;

interface Columns {
    name: string;
    width: number;
    align: Alignment['horizontal'];
}

const COLUMNS: Columns[] = [
    {
        name: 'STT',
        width: 8,
        align: 'center',
    },
    {
        name: 'Tên kênh',
        width: 35,
        align: 'left',
    },
    {
        name: 'Link kênh',
        width: 70,
        align: 'left',
    },
    {
        name: 'Doanh thu',
        width: 25,
        align: 'right',
    },
    {
        name: 'Doanh thu US',
        width: 25,
        align: 'right',
    },
];

const INDEX_COL_TYPE_NUMBER = [3, 4];

const styleHeader = { size: 13, bold: true, color: { argb: '000000' } };

const alignment = {
    wrapText: false,
    vertical: 'middle',
    horizontal: 'left',
};

export const exportToExcel = async (fileName: string, tableData: any[]) => {
    // Create a new workbook

    const workbook = new Excel.Workbook();
    Array.prototype.forEach.call([fileName], (sheetName) => {
        const worksheet = workbook.addWorksheet(sheetName, {
            views: [
                {
                    showGridLines: false,
                    state: 'frozen',
                    ySplit: ROW_FREEZE,
                },
            ],
        });
        worksheet.state = 'visible';

        const newWorkSheet = worksheet;
        // Header Table
        const headerTable = COLUMNS.map((item) => item.name);

        const rowHeader = newWorkSheet.addRow(headerTable);
        // rowHeader.height = 25;
        rowHeader.eachCell((cell, index) => {
            // @ts-ignore
            cell.alignment = {
                ...alignment,
                horizontal: COLUMNS[index - 1]?.align ?? 'left',
            };
            cell.font = styleHeader;
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'F6C7AB' },
            };
        });
        headerTable.forEach((item, index) => {
            newWorkSheet.getColumn(index + 1).width = COLUMNS[index].width;
        });

        tableData.forEach((rowItem) => {
            const row = newWorkSheet.addRow(rowItem);
            row.eachCell((cell, index) => {
                // @ts-ignore
                cell.alignment = {
                    ...alignment,
                    horizontal: COLUMNS[index - 1]?.align ?? 'left',
                };
                cell.font = { size: 12, color: { argb: '000000' } };
                if (INDEX_COL_TYPE_NUMBER.includes(index)) {
                    cell.numFmt = '#,##0';
                }
            });
        });

        // style border cho cell
        newWorkSheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
            if (rowIndex >= ROW_FREEZE)
                row.eachCell({ includeEmpty: true }, (cell) => {
                    const newCell = cell;
                    newCell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });
        });
    });
    await exportExcelJs(workbook, `${fileName}.xlsx`);
};

// Xuất file excel vs exceljs
export const exportExcelJs = (workbook: Excel.Workbook, fileName: string) =>
    new Promise((resolve) => {
        workbook.xlsx.writeBuffer().then((s) => {
            // @ts-ignore
            const byteCharacters = atob(s.toString('base64'));
            const byteNumbers = new Array(byteCharacters.length);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {
                type: 'application/octet-stream',
            });
            saveAs(blob, fileName);
            // @ts-ignore
            resolve();
        });
    });
