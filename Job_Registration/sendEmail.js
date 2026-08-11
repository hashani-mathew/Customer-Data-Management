function createOnEditTrigger() {
  var ss = SpreadsheetApp.getActive();
  // Create a new trigger for the onEdit function
  ScriptApp.newTrigger('EmailOnEdit')
        .forSpreadsheet(ss) 
        .onEdit() 
        .create();
}

function EmailOnEdit(e) {
  var lock = LockService.getDocumentLock();
  
  if (lock.tryLock(30000)) {
    try {
      let sheet = e.source.getSheetByName("Sheet1");

      let range = e.range;
      let row = range.getRow();
      let col = range.getColumn();
      let cellValue = range.getValue();

      if (col == 21 && cellValue === true) {
        let emailSent = sheet.getRange(row, 22).getValue(); 

        if (emailSent !== 'SENT') {
          let name = sheet.getRange(row, 3).getValue(); 
          let email = sheet.getRange(row, 5).getValue(); 
          let pdfUrl = sheet.getRange(row, 24).getValue(); 
          let pdfId = pdfUrl.split('/d/')[1].split('/')[0]; 
          
          let pdfFile;
          try {
            pdfFile = DriveApp.getFileById(pdfId).getBlob();
          } catch (error) {
            Logger.log('Error fetching PDF file: ' + error);
            return; 
          }

          let docUrl = sheet.getRange(row, 23).getValue(); 

          let today = new Date();
          let formattedDate = Utilities.formatDate(today, 'Asia/Colombo', 'MMMM dd, yyyy');
          let formattedTime = Utilities.formatDate(today, 'Asia/Colombo', 'HH:mm:ss');
          let timezoneOffset = -today.getTimezoneOffset();
          let sign = timezoneOffset >= 0 ? '+' : '-';
          let hours = Math.floor(Math.abs(timezoneOffset) / 60);
          let minutes = Math.abs(timezoneOffset) % 60;
          let formattedOffset = `GMT${sign}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

          let finalOutput = `${formattedDate}, ${formattedTime}`;

          // Email body
          let emailBody = '<b>Dear</b> <b>' + name +
          '</b>,<br><br>We are excited to inform you that your service order has been ready for checkup.' +
          '<br><br><b>Please Note:</b> An inspection fee of Rs.1,500/= will apply if you decide not to proceed with repairs after a full checkup.<br><br>Please find the attached document here.<br>If you have any questions or need support, please do not hesitate to contact us.' +
          '<br><br>Thank You, have a great day!<br><br>Best regards, <br><b>Team SH TECHINFO.</b><br>';

          emailBody += '<p></p> Date & Time: ' + finalOutput;

          let emailSignature = '<br><br>' +
            '<img src="https://drive.google.com/uc?export=view&id=XXXXXXXX" alt="Company Logo" style="width:100%;height:auto;"><br><br>' + // Replace YOUR_IMAGE_URL with the actual URL of your image
            '<b style="font-size:16px; color:#0099ff;"> Company Name </b><br>' +
            '<b>Visit us:</b><br> Address <br>' +
            'Mobile Number XXXXXXXXXXXXX <br><br>' +
            '<a href="https://www.website.com/" style="font-size: 16px; color: #9900FF;">www.shtechinfo.com</a><br><br>' + 
            '<span style="font-size: 10px;">CONFIDENTIALITY NOTICE:<br>This email message including attachments, is intended only for the person to whom it is addressed & may contain confidential information. Any un authorised review; use, disclosure, or distribution is prohibited. If you are not the intended recipient, please contact the sender by reply e-mail & destroy all copies of the original messages.</span>';

          emailBody += emailSignature;          

          try {
            MailApp.sendEmail({
              to: email,
              subject: 'Your Service Order Was Placed Successfully!', 
              htmlBody: emailBody, 
              attachments: [pdfFile] 
            });

            sheet.getRange(row, 22).setValue('SENT');
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
