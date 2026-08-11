
function createOnEditTrigger() {
  var ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('EmailOnEdit')
        .forSpreadsheet(ss)
        .onEdit() 
        .create();
}

function EmailOnEdit(e) {
  var lock = LockService.getDocumentLock();
  
  if (lock.tryLock(30000)) {
    try {
      let sheet = e.source.getSheetByName("");

      let range = e.range;
      let row = range.getRow();
      let col = range.getColumn();
      let cellValue = range.getValue();

      if (col == 19 && cellValue === true) {
        let emailSent = sheet.getRange(row, 20).getValue();
        if (emailSent !== 'SENT') {
          let name = sheet.getRange(row, 2).getValue(); 
          let email = sheet.getRange(row, 3).getValue(); 
          let pdfUrl = sheet.getRange(row, 22).getValue(); 
          let pdfId = pdfUrl.split('/d/')[1].split('/')[0];
          
          let pdfFile;
          try {
            pdfFile = DriveApp.getFileById(pdfId).getBlob();
          } catch (error) {
            Logger.log('Error fetching PDF file: ' + error);
          }

          let docUrl = sheet.getRange(row, 21).getValue();
          let today = new Date();
          let formattedDate = Utilities.formatDate(today, 'Asia/Colombo', 'EEEE, MMMM dd, yyyy');
          let formattedTime = Utilities.formatDate(today, 'Asia/Colombo', 'HH:mm:ss');
          let timezoneOffset = -today.getTimezoneOffset();
          let sign = timezoneOffset >= 0 ? '+' : '-';
          let hours = Math.floor(Math.abs(timezoneOffset) / 60);
          let minutes = Math.abs(timezoneOffset) % 60;
          let formattedOffset = `GMT${sign}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

          let finalOutput = `${formattedDate} ${formattedTime} (${formattedOffset})`;

          // email body
          let emailBody = '<b>Dear</b> <b>' + name +
          '</b>,<br><br>We are happy to inform you that your device has been successfully repaired and delivered.' +
          '<br><br>We hope you are satisfied with our service. We would greatly appreciate it if you could take a moment to leave us a 5-star ⭐⭐⭐⭐⭐ review. Your feedback helps us improve our services and serve you better. write a review👉 https://bit.ly/shtechinfo-review<br><br>Please find the attached document here.<br>If you have any questions or need support, please do not hesitate to contact us.' +
          '<br><br>Thank You, have a great day!<br><br>Best regards, <br><b>Team SH TECHINFO</b><br>';

          emailBody += '<p></p> Date & Time: ' + finalOutput;

          // email with the PDF attached
          try {
            MailApp.sendEmail({
              to: email, 
              subject: 'Your Device has been Successfully Repaired!',
              htmlBody: emailBody, 
              attachments: [pdfFile], 
              name: '', 
              replyTo: '' 
            });

            sheet.getRange(row, 20).setValue('SENT');
          } catch (error) {
            Logger.log('Error sending email: ' + error);
          }
        }
      }
    } finally {
      lock.releaseLock();
    }
  } else {
    Logger.log('Could not obtain lock after 30 seconds');
  }
}

function setupEditTrigger() {
  var sheet = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('EmailOnEdit')
    .forSpreadsheet(sheet)
    .onEdit()
    .create();
}