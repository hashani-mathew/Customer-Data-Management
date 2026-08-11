function handleEdit(e) {
  if (!e) {
    Logger.log("No event object");
    return;
  }

  var range = e.range;
  var sheet = range.getSheet();
  var editedRow = range.getRow();
  var editedColumn = range.getColumn();
  Logger.log("Edited cell: " + range.getA1Notation());

  var lastColumn = 19; // Column S
  var linkColumn = 21; // Column W

  if (editedColumn >= 1 && editedColumn <= 19 && editedRow > 1) {
    var formData = sheet.getRange(editedRow, 1, 1, lastColumn).getValues()[0];

    var placeholders = {
    "{{Reference No}}": formData[0],
    "{{Name}}": formData[1],
    "{{Phone Number}}": formData[3],
    "{{Email}}": formData[2],
    "{{Address}}": formData[4],
    "{{Device Name}}": formData[5],
    "{{Brand and Model}}": formData[7],
    "{{Serial Number}}": formData[10],
    "{{Accessories}}": formData[8],
    "{{Warranty}}": formData[9],
    "{{Problem Name}}": formData[6],
    "{{Received By}}": formData[15],
    "{{Delivered By}}": formData[14],
    "{{Technical Report}}": formData[11],
    "{{Venue}}": formData[12]
    };

    var templateId = "";  // Template ID
    var folderId = "";  // Folder ID

    var templateFile = DriveApp.getFileById(templateId);
    var newFile = templateFile.makeCopy("Receipt for " + formData[1], DriveApp.getFolderById(folderId));
    var doc = DocumentApp.openById(newFile.getId());
    var body = doc.getBody();

      let today = new Date();
      let formattedDate = Utilities.formatDate(today, 'Asia/Colombo', 'EEEE, MMMM dd, yyyy');
      let formattedTime = Utilities.formatDate(today, 'Asia/Colombo', 'HH:mm:ss');
      let timezoneOffset = -today.getTimezoneOffset();
      let sign = timezoneOffset >= 0 ? '+' : '-';
      let hours = Math.floor(Math.abs(timezoneOffset) / 60);
      let minutes = Math.abs(timezoneOffset) % 60;
      let formattedOffset = `GMT${sign}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

      let finalOutput = `${formattedDate} ${formattedTime} (${formattedOffset})`;


    body.replaceText("{{Reference No}}", formData[0]);
    body.replaceText("{{Date}}", finalOutput); // 
    body.replaceText("{{Name}}", formData[1]);
    body.replaceText("{{Phone Number}}", formData[3]);
    body.replaceText("{{Email}}", formData[2]);
    body.replaceText("{{Address}}", formData[4]);
    body.replaceText("{{Device Name}}", formData[5]);
    body.replaceText("{{Brand and Model}}", formData[7]);
    body.replaceText("{{Serial Number}}", formData[10]);
    body.replaceText("{{Accessories}}", formData[8]);
    body.replaceText("{{Warranty}}", formData[9]);
    body.replaceText("{{Problem Name}}", formData[6]);
    body.replaceText("{{Delivered By}}", formData[14]);
    body.replaceText("{{Received By}}", formData[15]);
    body.replaceText("{{Venue}}", formData[12]);
    body.replaceText("{{Technical Report}}", formData[11]);


    doc.saveAndClose();

    var docUrl = newFile.getUrl();
    sheet.getRange(editedRow, linkColumn).setValue(docUrl);
  }
}

function setupEditTrigger() {
  var sheet = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('handleEdit')
    .forSpreadsheet(sheet)
    .onEdit()
    .create();
}
