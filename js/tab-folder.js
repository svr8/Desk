var slideAnimationSpeed = 60;
var folderFocus;
var folderRecord = [];
function FolderTab(id, absolutePath) {
    this.id = id;
    this.path = absolutePath;
    this.name = getDirectoryName(this.path);
    this.image = new Image('Button-ToggleFolder', '../images/Button-ToggleFolder.png', '../images/Button-ToggleFolder.png');
    this.isExpanded = false;

    this.subFolders = [];
    this.subFiles = [];
    this.isSubDirectoriesLoaded = false;

    this.renderHTML = function() {
        return '<div class="Tab-Folder" id="FD-'+this.id+'">'+
                   '<div class="TargetWrap">'+
                        this.image.renderHTML()+
                        '<div class="Text-Tab">'+this.name+'</div>'+
                    '</div>'+
                    '<div class="SubDir"></div>'+
                '</div>';
    };
}

function addFolder(parent, folder) {
    //Update sidemenu
    $(parent).append(folder.renderHTML());
    
    //Update folderRecord[]
    folderRecord.push(folder);

    /*-----------------------Add event listeners-----------------------*/

    //Get DOM Element
    var el = $("#FD-"+folder.id);
    var targetWrap = $(el).find('.TargetWrap').first();
    var subDirContainer = $(el).find('.SubDir').first();
    
    //Hide SubDirectories
    subDirContainer.slideUp();

    //Toggle Folder Dropdown
    targetWrap.on("click", function(){
        if(folder.isExpanded) 
            collapseFolder(folder);
        else 
            expandFolder(folder);
    });
}

function collapseFolder(folder) {
    //Get DOM Element
    var el = $("#FD-"+folder.id);
    var targetWrap = $(el).find('.TargetWrap').first();
    var subDirContainer = $(el).find('.SubDir').first();

    //Hide content
    subDirContainer.slideUp(slideAnimationSpeed);
    //Rotate image
    targetWrap.find(".Button-ToggleFolder").rotate(0);
    
    //Toggle expand status
    folder.isExpanded = false;
}

function expandFolder(folder) {
    //Get DOM Element
    var el = $("#FD-"+folder.id);
    var targetWrap = $(el).find('.TargetWrap').first();
    var subDirContainer = $(el).find('.SubDir').first();

    //Load Content
    if(!folder.isSubDirectoriesLoaded) {
        getDirectoryContents(folder, function() {
            //Clear Subdirectories
            subDirContainer.html('');

            //Load Tabs
            //FolderTabs:
            for(var i=0;i<folder.subFolders.length;i++) 
                addFolder(subDirContainer, folder.subFolders[i]);
            //FileTabs
            for(var i=0;i<folder.subFiles.length;i++)
                addFile(subDirContainer, folder.subFiles[i]);
            
            //Toggle Status
            folder.isSubDirectoriesLoaded = true;
            
            //Show Content
            subDirContainer.slideDown(slideAnimationSpeed);    

            //Rotate Arrow
            targetWrap.find(".Button-ToggleFolder").rotate(90); 
        }); 
    }
    else { 
        //Show Content
        subDirContainer.slideDown(slideAnimationSpeed);    

        //Rotate Arrow
        targetWrap.find(".Button-ToggleFolder").rotate(90);   
    } 
    //Toggle expanded status
    folder.isExpanded = true;
}
function folderReference(path) {
    var dirSize = folderRecord.length;
    for(var i=0;i<dirSize;i++)
        if(folderRecord[i].path == path)
            return folderRecord[i];
    return 'undefined';
}
function reloadFolder(folder) {
    if(folder=='undefined')
        return;
    
    folder.isSubDirectoriesLoaded = false;

    //Update Record
    deleteFolders(folder.subFolders);
    folder.subFolders = [];
    folder.subFiles = [];

    collapseFolder(folder);
    expandFolder(folder);

    //Reset file id
    var len = folder.subFiles.length;
    for(var i=0;i<len;i++)
        if(folder.subFiles[i].path==curFile.path) {
            $("#FL-"+folder.subFiles[i].id).attr('id', curFile.id);
            folder.subFiles[i].id = curFile.id;
            break;
        }
}

function deleteFolders(folders) {
    var dirSize = folderRecord.length;
    var folderSize = folders.size;
    for(var j=0;j<folderSize;j++) {
        for(var i=0;i<dirSize;i++) {
            if(folder[j] == folderRecord[i]) {
                folderRecord.splice(i, 1);
                dirSize--;
                break;
            }
        }
    }
}

