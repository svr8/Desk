var fs = require('fs');

var curFile = new WorkingTab('', '');
var workfileRecord = [];
var inputFile=new WorkingTab(-1, ''),
    outputFile=new WorkingTab(-1, '');
function WorkingTab(id, absolutePath) {
    this.id = id;
    this.path = absolutePath;
    this.name = getDirectoryName(this.path);
    this.image = new Image('Button-CloseTab', 'images/image.png', 'images/image.png');
    this.isSaved = false;
    this.exists = true;
    this.data = '';
    this.isFocused = false;

    this.renderHTML = function() {
        return '<div class="Tab-WorkingFile" id="WT-'+this.id+'">'+ '<div class="TargetWrap">'+ this.image.renderHTML()+ '<div class="Text-Tab">'+this.name+'</div>'+ '</div>'+'</div>'; 
    };
}

function addWorkingFile(file) {

    //If file already exists in working container, return
    var recordSize = workfileRecord.length;
    for(var i=0; i<recordSize; i++)
        if(workfileRecord[i].id==file.id)
            return;

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
    curFile.isFocused = false; //toggle Focus status
    $('#WT-'+curFile.id+' .TargetWrap').css('background-color', 'inherit'); //edit css of curFile
    curFile.data = getData();  //store current data

    curFile = file;

    curFile.isFocused = true; //toggle Focus status
    $('#WT-'+curFile.id+' .TargetWrap').css('background-color', 'rgb(32,32,32)'); //edit css of curFile
    setData(curFile.data);    //load file data

    focusOnEditor();
}

function closeWorkTab(file) {
    file.data = getData();
    file.exists = fs.existsSync(file.path);
    
    if( (!file.exists && file.data.length>0) || file.exists ) {   
        //Save file prompt
        saveFile(file, file.data);
    }
    
    var el = $("#WT-"+file.id);
    
    //Delete from page
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
    if(workfileRecordSize>0)
        selectWorkingFile(workfileRecord[0]);
    else
        setData('');
}