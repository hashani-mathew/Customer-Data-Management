function doGet() {
  return HtmlService.createHtmlOutputFromFile('job_completed');
}

function findDetails(referenceNumber) {
  const sheet = SpreadsheetApp.openById("").getSheetByName("");
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == referenceNumber) {
      return {
        name: data[i][2],
        email: data[i][4],
        phoneNumber: data[i][3],
        address: data[i][7],
        deviceName: data[i][8],
        problemName: data[i][13],
        brandNmodel: data[i][12],
        accessoryName: data[i][15],
        warranty: data[i][14],
        serialNumber: data[i][11]
      };
    }
  }
  return null;
}

function submitForm(formData) {
  const destSheet = SpreadsheetApp.openById("").getSheetByName("");
  const newRow = [
    formData.referenceNumber,
    formData.name,
    formData.email,
    formData.phoneNumber,
    formData.address,
    formData.deviceName,
    formData.problemName,
    formData.brandNmodel,
    formData.accessoryName,
    formData.warranty,
    formData.serialNumber,
    formData.technicalReport,
    formData.venueType,
    formData.deliveryDate,
    formData.deliveredBy,
    formData.receivedBy,
    formData.message,
    formData.waMessage
  ];
  destSheet.appendRow(newRow);
  
  const lastRow = destSheet.getLastRow();
  destSheet.getRange(lastRow, 19).insertCheckboxes(); // Column S
  destSheet.getRange(lastRow, 23).insertCheckboxes(); // Column W
}
