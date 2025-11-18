function getDataFromSheet() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const [headers, ...data] = spreadsheet.getDataRange().getDisplayValues();
  }
  