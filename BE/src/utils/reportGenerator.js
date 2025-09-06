import ExcelJS from 'exceljs';

export const generateExcelReport = async (reportName, headers, data, sheetName = 'Report') => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.columns = headers.map(header => ({ header: header.title, key: header.key, width: header.width }));

  data.forEach(row => {
    worksheet.addRow(row);
  });


  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};
