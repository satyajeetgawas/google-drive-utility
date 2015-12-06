function googleDriveUtility() {
  
    var totalSize = 0;
    var folders = DriveApp.getFolders();
    var driveReportFileItr = DriveApp.getFilesByName("Google Drive Report");
    var sheet;
    if(driveReportFileItr.hasNext()){
        sheet = SpreadsheetApp.open(driveReportFileItr.next()).getActiveSheet();
    }else{
        sheet = SpreadsheetApp.create("Google Drive Report").getActiveSheet();
    }
    sheet.clear();
    sheet.appendRow(["Folder Name","Size in MB","Owner"]);
    while(folders.hasNext())
     {
      var folderSize = 0;
      var folder = folders.next();
      var files = folder.getFiles();
      while(files.hasNext()){
         folderSize +=files.next().getSize();
      }
      folderSize = folderSize/(1024*1024);
      totalSize +=folderSize;
      if(folderSize > 1)
        sheet.appendRow(["=HYPERLINK(\""+folder.getUrl()+"\",\""+folder.getName()+"\")", folderSize.toFixed(2),folder.getOwner().getName()]);
      }
    var range = sheet.getRange(1, 1, sheet.getMaxRows(),2);
    range.sort({column: 2, ascending: false})
    sheet.appendRow(["Total Size",totalSize.toFixed(2)+" MB"]);
 }

