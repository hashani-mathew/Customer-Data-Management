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

  var lastColumn = 21; // Column S
  var linkColumn = 23; // Column W

  if (editedColumn >= 1 && editedColumn <= 21 && editedRow > 1) {
    var formData = sheet.getRange(editedRow, 1, 1, lastColumn).getValues()[0];

    var placeholders = {
    "{{Reference No}}": formData[0],
    "{{Date}}": formData[1],
    "{{Name}}": formData[2],
    "{{Phone Number}}": formData[3],
    "{{Email}}": formData[4],
    "{{Address}}": formData[7],
    "{{Device Name}}": formData[8],
    "{{Brand and Model}}": formData[10],
    "{{Serial Number}}": formData[11],
    "{{Accessories}}": formData[12],
    "{{Warranty}}": formData[14],
    "{{Problem Name}}": formData[13],
    "{{Collected By}}": formData[17]
    };

    var templateId = "";  // Template ID
    var folderId = "";  // Folder ID

    var templateFile = DriveApp.getFileById(templateId);
    var newFile = templateFile.makeCopy("Receipt for " + formData[0], DriveApp.getFolderById(folderId));
    var doc = DocumentApp.openById(newFile.getId());
    var body = doc.getBody();

      let today = new Date();
      let formattedDate = Utilities.formatDate(today, 'Asia/Colombo', 'MMMM dd, yyyy');
      let formattedTime = Utilities.formatDate(today, 'Asia/Colombo', 'HH:mm:ss');
      let timezoneOffset = -today.getTimezoneOffset();
      let sign = timezoneOffset >= 0 ? '+' : '-';
      let hours = Math.floor(Math.abs(timezoneOffset) / 60);
      let minutes = Math.abs(timezoneOffset) % 60;
      let formattedOffset = `GMT${sign}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

      let finalOutput = `${formattedDate}, ${formattedTime}`;
  

  var today1 = new Date();
  var formattedDate1 = Utilities.formatDate(today1, Session.getScriptTimeZone(), 'MMMM dd, yyyy');

  var estimateDate = new Date(today1.getTime() + 5 * 24 * 60 * 60 * 1000);
  var formattedEstimateDate = Utilities.formatDate(estimateDate, Session.getScriptTimeZone(), 'MMMM dd, yyyy');


    body.replaceText("{{Reference No}}", formData[0]);
    body.replaceText("{{Date}}", finalOutput); 
    body.replaceText("{{Name}}", formData[2]);
    body.replaceText("{{Phone Number}}", formData[3]);
    body.replaceText("{{Email}}", formData[4]);
    body.replaceText("{{Address}}", formData[7]);
    body.replaceText("{{Device Name}}", formData[8]);
    body.replaceText("{{Brand and Model}}", formData[10]);
    body.replaceText("{{Serial Number}}", formData[11]);
    body.replaceText("{{Accessories}}", formData[12]);
    body.replaceText("{{Warranty}}", formData[14]);
    body.replaceText("{{Problem Name}}", formData[13]);
    body.replaceText("{{Collected By}}", formData[17]);
    body.replaceText("{{Device Receive Date}}", formattedDate1);
    body.replaceText("{{Estimate Date}}", formattedEstimateDate); 

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
