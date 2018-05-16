var fs = require('fs');

var curFile = null;
var workfileRecord = [];
var inputFile=new WorkingTab(-1, ''),
    outputFile=new WorkingTab(-1, '');
function WorkingTab(id, absolutePath) {
    this.id = id;
    this.path = absolutePath;
    this.name = getDirectoryName(this.path);
    this.image = new Image('Button-CloseTab', '../images/Button-CloseTab-Def.png', '../Button-CloseTab-Sel.png');
    this.isSaved = true;
    this.exists = true;
    this.data = '';

    this.renderHTML = function() {
        return '<div class="Tab-WorkingFile" id="WT-'+this.id+'">'+ '<div class="TargetWrap">'+ this.image.renderHTML()+ '<div class="Text-Tab">'+this.name+'</div>'+ '</div>'+'</div>'; 
    };
}

function addWorkingFile(file) {

    //If file already exists in working container, return
    var recordSize = workfileRecord.length;
    for(var i=0; i<recordSize; i++)
        if(workfileRecord[i].path==file.path) {
            selectWorkingFile(workfileRecord[i]);
            return;
        }

    //Update sidemenu
    $("#WorkingFileListContainer").append(file.renderHTML());
    workfileRecord.push(file);
    
    /*-----------------------Add event listeners-----------------------*/

    //Get DOM Element
    var el = $("#WT-"+file.id);

    //Close Tab
    $($(el).find(".Button-CloseTab")).on("click", function(){
        closeWorkTab(file);
    });

    //Open Tab
    $(el).on("click", function() {
        //Update current tab
        console.log("WorkFile opened: "+file.name);
        selectWorkingFile(file);
    });

}

function selectWorkingFile(file) {
    if(curFile!=null) {
        $('#WT-'+curFile.id+' .TargetWrap').css('background-color', 'inherit'); //edit css of curFile
        curFile.data = getData();  //store current data
    }

    curFile = file;
    if(curFile==null) return;
    var curStatus = curFile.isSaved;
    $('#WT-'+curFile.id+' .TargetWrap').css('background-color', 'rgb(32,32,32)'); //edit css of curFile
    console.log(curFile.data);
    setData(curFile.data);    //load file data
    showEditor(true);         //display editor

    focusOnEditor();
    setFileSaveStatus(curFile, curStatus);
}
function showSaveFilePrompt(file, status) {
    if(status)
        $('.Prompt').fadeIn(150);
    else
        $('.Prompt').fadeOut(150);
    
    $("#Prompt-Yes").on('click', function() {
        saveFile(file);
        removeWorkFileTab(file);
        $('.Prompt').fadeOut(150);                              
    });
    $("#Prompt-No").on('click', function() {
        removeWorkFileTab(file);  
        $('.Prompt').fadeOut(150);                        
    });
    $('#Prompt-Cancel').on('click', function(){
        $('.Prompt').fadeOut(150);              
    });
}


function closeWorkTab(file) {
    file.data = getData();
    file.exists = (file.path.length>0 && fs.existsSync(file.path));
    
    if( (!file.exists && file.data.length>0) || !file.isSaved ) {   
        //Save file prompt
        console.log('k');
        showSaveFilePrompt(file, true);
        return;
    }
    removeWorkFileTab(file);
}
function removeWorkFileTab(file) {
    var el = $("#WT-"+file.id);
    $(el).remove();
    console.log("WorkFile closed: "+file.name);

    //Update workfileRecord[]
    var workfileRecordSize = workfileRecord.length;
    for(var i=0;i<workfileRecordSize;i++) {
        if(workfileRecord[i].id==file.id) {
            workfileRecord.splice(i,1);
            workfileRecordSize--;
            break;
        }
    }

    //Update file save status
    setFileSaveStatus(file, true);

    //Toggle File
    if(workfileRecordSize>0)
        selectWorkingFile(workfileRecord[0]);
    else {
        showEditor(false);
        selectWorkingFile(null);
    }
}

var isEditorVisible = false;
function showEditor(status) {
    isEditorVisible = status;
    if(isEditorVisible) {
        $('#editor').show();
        //Reposition/Resize .Editor, .IO        
        if(sideMenuIsVisible) {
            $("#editor, .IO").css("left", $('.Sidemenu').offset().left+$('.Sidemenu').width()+3);
            $("#editor, .IO").width($(window).width()-$('.Sidebar').width()-$('.Sidemenu').width()-3);
        }
        else {
            $("#editor, .IO").css("left", $('.Sidebar').width());
            $("#editor, .IO").width($(window).width()-$('.Sidebar').width());
        }
    }
    else {
        $('#editor').hide();
    }
}
function reloadWorkFiles() {
    var records = workfileRecord.length;
    for(var i=0; i<records; i++) {
        for(var j=i+1; j<records; j++) {
            if(workfileRecord[i].path==workfileRecord[j].path) {
                closeWorkTab(workfileRecord[j]);
                break;
            }
        }
    }
}
function setFileSaveStatus(file, status) {
    file.isSaved = status;
    if(file.isSaved) {
        $('#FL-'+file.id+' .Text-Tab').first().css('font-weight', 'normal');
        $('#WT-'+file.id+' .Text-Tab').first().css('font-weight', 'normal');
        
        $('#FL-'+file.id+' .Button-CloseTab').show();
        $('#WT-'+file.id+' .Button-CloseTab').show();
        
    }
    else {
        $('#FL-'+file.id+' .Text-Tab').first().css('font-weight', 'bold');
        $('#WT-'+file.id+' .Text-Tab').first().css('font-weight', 'bold'); 
        
        $('#FL-'+file.id+' .Button-CloseTab').hide();
        $('#WT-'+file.id+' .Button-CloseTab').hide();
    }
}
function toggleWorkFile(dir) {
    var index    = getWorkFileRecordIndex(curFile),
        newIndex = index,
        len      = workfileRecord.length;

    if(dir) newIndex = (index+1) % len;   //move down
    else newIndex = (index-1+len) % len;  //move up
    selectWorkingFile(workfileRecord[newIndex]);
}
function getWorkFileRecordIndex(file) {
    var len = workfileRecord.length;
    for(var i=0;i<len;i++) 
        if(workfileRecord[i].path == file.path) return i;         
    return -1;
}