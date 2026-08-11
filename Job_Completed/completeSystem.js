function completeEdit(e) {
  if (!e) {
    Logger.log("No event object");
    return;
  }
  
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var editedColumn = range.getColumn();
  var editedRow = range.getRow();
  Logger.log("Edited cell: " + range.getA1Notation());
  
  var checkboxColumn = 23; // Column S
  var lastColumn = 23; 
  var completedColumn = 24; // Column T
  
  if (editedColumn >= 1 && editedColumn <= 22 && editedRow > 1) {
    var cell = sheet.getRange(editedRow, checkboxColumn);
  }
  
  if (editedColumn == checkboxColumn && editedRow > 1) {
    var cell = sheet.getRange(editedRow, checkboxColumn);
    var rowRange = sheet.getRange(editedRow, 1, 1, lastColumn);
    var completedCell = sheet.getRange(editedRow, completedColumn);
    
    if (cell.isChecked()) {
      rowRange.setBackground('lightgreen');
      completedCell.setValue("Completed");
    } else {
      rowRange.setBackground(null);
      completedCell.setValue("");
    }
  }
}
