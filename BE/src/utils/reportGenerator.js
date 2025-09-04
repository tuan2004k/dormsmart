import ExcelJS from 'exceljs';

export const generateExcelReport = async (reportName, headers, data, sheetName = 'Report') => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Add headers
  worksheet.columns = headers.map(header => ({ header: header.title, key: header.key, width: header.width }));

  // Add data
  data.forEach(row => {
    worksheet.addRow(row);
  });

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};
