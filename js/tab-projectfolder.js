var projectFolderRecord = [];
function ProjectFolderTab(id, absolutePath) {
    this.id = id;
    this.path = absolutePath;
    this.name = getDirectoryName(this.path);
    this.image = new Image('Button-CloseTab', '../images/Button-ToggleFolder-Def.png', '../images/Button-ToggleFolder-Sel.png');
    this.subFolders = [];
    this.subFiles = [];

    this.renderHTML = function() {
        return '<div id="PF-'+id+'" class="Tab-ProjectFolder">'+ '<div class="TargetWrap">'+ this.image.renderHTML()+ '<div class="Text-Tab">'+this.name+'</div>'+ '</div>'+ '</div>';
    };
}
function addProjectFolder(projectFolder) {
    //Do nothing if project already exists
    var size = projectFolderRecord.length;
    for(var i=0;i<size;i++)
        if(projectFolderRecord[i].path == projectFolder.path)
            return;
    
    //Update record
    projectFolderRecord.push(projectFolder);
    updateProjectFolderPath();

    //Update sidemenu
    $("#OpenFolderListContainer").append(projectFolder.renderHTML());

    /*-----------------------Add event listeners-----------------------*/

    //Get DOM Element
    var el = $("#PF-"+projectFolder.id);
    
    //Close Project
    $($(el).find(".Button-CloseTab")).on("click", function(){
        //Delete from page
        $(el).remove();

        //Update Record
        var size = projectFolderRecord.length;
        for(var i=0;i<size;i++) {
            if(projectFolderRecord[i].path == projectFolder.path) {
                projectFolderRecord.splice(i,1);
                break;
            }
        }
        updateProjectFolderPath();
    });

    //Open Project
    $($(el).find(".TargetWrap")).on("click", function(){
        getDirectoryContents(projectFolder, function() {
            //Clear CurrentFolder
            $("#WorkingFileListContainer").html('');
            $("#CurrentProjectContainer").html('');
            
            //Load Folder
            var fd = new FolderTab(projectFolder.id, projectFolder.path);            
            addFolder('#CurrentProjectContainer', fd);
            selectFolder(fd);
            expandFolder(fd);            

            //Select Sidemenu: CurrentFolder
            selectSideMenu(sidemenu[0]);
            
            //Style Root Folder Tab
            var el = $('.Tab-Folder .TargetWrap .Text-Tab').first();
            el.css({"left":"0px","width":"198px","text-align":"center","font-family":"TitleFont", "font-size":"20pt",
            "margin": "2px","border-bottom":"1px solid white"});
            el = $('.Tab-Folder .TargetWrap').first();
            el.css({'width': '196px', 'left':'5px'});
            el = $('.Tab-Folder').first().find('.Button-ToggleFolder').first();
            el.hide();
        });        
    });
    
}