function addFile(parent, file) {
  //Update sidemenu
  $(parent).append(file.renderHTML());    
  
  /*-----------------------Add event listeners-----------------------*/

  //Get DOM Element
  var el = $("#FL-"+file.id);

  //Open Tab
  $(el).on("click", function() {
      console.log("File opened: "+file.name);
      var wt = new WorkingTab(file.id, file.path);
      wt.exists = true;
      addWorkingFile(wt);
      fileRead(file, function(data){
          wt.data = data;
          selectWorkingFile(wt);
      });
  });
}

function isValidNewFile(parentFolder, fileName) {
  var path = parentFolder.path+slash+fileName;
  
  //Check if file exists already
  if (fs.existsSync(path))
      return false;
  
  //Create new file
  createNewFileAt(path);

  //Reload sidemenu contents
  reloadFolder(parentFolder);
}