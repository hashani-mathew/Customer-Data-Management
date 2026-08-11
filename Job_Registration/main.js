
function doGet() {
  return HtmlService.createHtmlOutputFromFile('job_registration');
}

function generateRefNumber() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  var highestNum = 0;

  for (var i = 1; i <= lastRow; i++) {
    var ref = sheet.getRange(i, 1).getValue();
    if (ref.startsWith('RN24-')) {
      var num = parseInt(ref.split('-')[1]);
      if (num > highestNum) {
        highestNum = num;
      }
    }
  }

  var newNum = highestNum + 1;
  var newRef = 'RN24-' + ('0000' + newNum).slice(-4);

  return newRef;
}

function submitForm(formData) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("");
    var newRow = sheet.getLastRow() + 1;

    sheet.getRange("A" + newRow).setValue(formData.referenceNumber);
    sheet.getRange("B" + newRow).setValue(formData.date);
    sheet.getRange("C" + newRow).setValue(formData.title + ". " + formData.name);
    sheet.getRange("D" + newRow).setValue(formData.phoneNumber);
    sheet.getRange("E" + newRow).setValue(formData.email);
    sheet.getRange("F" + newRow).setValue(formData.type);
    sheet.getRange("G" + newRow).setValue(formData.companyName);
    sheet.getRange("H" + newRow).setValue(formData.address);
    sheet.getRange("I" + newRow).setValue(formData.deviceName);
    sheet.getRange("J" + newRow).setValue(formData.devicePassword);
    sheet.getRange("K" + newRow).setValue(formData.brandNmodel);
    sheet.getRange("L" + newRow).setValue(formData.serialNumber);
    sheet.getRange("M" + newRow).setValue(formData.accessoryName);
    sheet.getRange("N" + newRow).setValue(formData.problemName);
    sheet.getRange("O" + newRow).setValue(formData.warranty);
    sheet.getRange("P" + newRow).setValue(formData.venue);
    sheet.getRange("Q" + newRow).setValue(formData.issuedBy);
    sheet.getRange("R" + newRow).setValue(formData.collectedBy);
    sheet.getRange("S" + newRow).setValue(formData.message);
    sheet.getRange("T" + newRow).setValue(formData.waMessage);
    
    sheet.getRange('U' + newRow).insertCheckboxes();
    sheet.getRange('Y' + newRow).insertCheckboxes();
    
    return {success: true, message: "Form submitted successfully!"};
  } catch (error) {
    return {success: false, message: "Error submitting form: " + error.message};
  }
}
