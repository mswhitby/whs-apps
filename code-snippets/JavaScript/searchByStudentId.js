function searchByStudentId(studentID=12345) {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const [headers, ...settings] = spreadsheet.getSheetByName('Settings').getDataRange().getDisplayValues();
    
    // Find the indices we need
    const activeIndex = headers.indexOf('Active');
    const sheetNameIndex = headers.indexOf('Sheet Name');
    const testIndex = headers.indexOf('Test');
    const testDateIndex = headers.indexOf('Test Date');
    
    if (activeIndex === -1 || sheetNameIndex === -1) {
      throw new Error('Required columns not found in Settings');
    }
    
    let studentName = null;
    const testAssignments = [];
    
    // Process each active test
    settings
      .filter(row => row[activeIndex] === true || row[activeIndex] === "TRUE")
      .forEach(row => {
        const sheetName = row[sheetNameIndex];
        const testName = row[testIndex];
        const testDate = row[testDateIndex];
        const displayDate = formatDate(testDate)
        
        try {
          const testSheet = spreadsheet.getSheetByName(sheetName);
          if (!testSheet) {
            Logger.log(`Warning: Sheet "${sheetName}" not found`);
            return;
          }
          
          const [testHeaders, ...testData] = testSheet.getDataRange().getValues();
          const givenNameIdx = testHeaders.indexOf('givenNam')
          const firstNameIdx = testHeaders.indexOf('firstName')
          const middleInitialIdx = testHeaders.indexOf('middleInitial')
  
          const activityIndex = testHeaders.indexOf('activity');
          let activity
          
          // Find the room column 
          const roomIndex = testHeaders.findIndex(header => 
            header.toString().toLowerCase().includes('room')
          );
          
          if (roomIndex === -1) {
            Logger.log(`Warning: No room column found in ${sheetName}`);
            return;
          }
          
          // Look for the student ID in column 0 (Student ID column)
          const studentRow = testData.find(row => 
            row[0] && row[0].toString().trim() === studentID.toString().trim()
          );
          
          if (studentRow) {
            if (!studentName) {
              const givenName = (givenNameIdx ? studentRow[givenNameIdx] : '') || studentRow[1];
              const firstName = (firstNameIdx ? studentRow[firstNameIdx] : '') || studentRow[2];
              const middleInitial = (middleInitialIdx ? studentRow[middleInitialIdx] : '') || studentRow[3];
              studentName = `${givenName.trim()}, ${firstName.trim()} ${middleInitial.trim()}`.trim().replace(/^,+|,+$/g, "").trim();
            }
  
            if (activityIndex) {
              activity = studentRow[activityIndex] || testName;
            }
  
            testAssignments.push({
              testDate: testDate,
              displayDate: displayDate,
              test: activityIndex ? activity : testName,
              room: studentRow[roomIndex]
            });
            console.log(testAssignments)
          }
        } catch (error) {
          Logger.log(`Error processing sheet ${sheetName}: ${error.message}`);
        }
      });
  
      Logger.log({
        studentName: studentName,
        studentID: studentID.toString().trim(),
        
        assignments: testAssignments
      });
    
    return {
      studentName: studentName,
      studentID: studentID.toString().trim(),
      assignments: testAssignments
    };
  }