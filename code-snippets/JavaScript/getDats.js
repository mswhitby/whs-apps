function getData() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const [headers, ...data] = spreadsheet.getDataRange().getDisplayValues();
  }
  