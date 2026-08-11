function convertEdit(e) {
  if (!e) {
    Logger.log("No event object");
    return;
  }
  var sheet = e.source.getActiveSheet();
  var editedRange = e.range;

  if (sheet.getName() === 'Sheet1' && editedRange.getColumn() === 21) {
    var startRow = editedRange.getRow();
    var numRows = editedRange.getNumRows();

    for (var i = 0; i < numRows; i++) {
      var currentRow = startRow + i;
      var docUrl = sheet.getRange(currentRow, 21).getValue(); // column X (24)
      var pdfUrl = convertToPdfUrl(docUrl);
      
      // PDF URL in column V
      sheet.getRange(currentRow, 22).setValue(pdfUrl);
    }
  }
}

function convertToPdfUrl(docUrl) {
  var pattern = /https:\/\/docs\.google\.com\/document\/d\/([\w-]+)\/edit\?usp=drivesdk/;
  var match = docUrl.match(pattern);
  
  if (match && match.length > 1) {
    var docId = match[1];
    var pdfUrl = 'https://docs.google.com/document/d/' + docId + '/export?format=pdf';
    return pdfUrl;
  } else {
    return 'Invalid Google Docs URL';
  }
}
