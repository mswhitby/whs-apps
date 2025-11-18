function loadStudents(roomNumber="A121") {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const [headers, ...students] = spreadsheet.getSheetByName('students').getDataRange().getDisplayValues();
  
    const roomIndex = headers.indexOf('room');
    const filteredStudents = students.filter(row => row[roomIndex] == roomNumber);
    Logger.log(filteredStudents)
  
    // const attendanceChecker = Object.fromEntries(
    //   Array.from({ lenght: 4 }, (_, i) => [`check${i + 1}`, true])
    // )
    // Logger.log(attendanceChecker)
  
    const roster = filteredStudents.map(row => {
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = row[idx];
      });
      // return {...obj, ...attendanceChecker};
      return obj
    });
    Logger.log(roster)
  }
  