function FileTab(id, absolutePath) {
    this.id = id;
    this.path = absolutePath;
    this.name = getDirectoryName(this.path);
    // this.image = new Image('Button-DeleteTab', 'images/image.png', 'images/image.png');

    this.renderHTML = function() {
        return '<div class="Tab-File" id="FL-'+this.id+'">'+ '<div class="TargetWrap">'+ '<div class="Text-Tab">'+this.name+'</div>'+ '</div>'+'</div>'; 
    };
}

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
