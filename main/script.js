const {webFrame} = require('electron')
var curZoom = 1,
    changeZoomBy = 0.2;

var ioPanelIsVisible = false;
var mainMenuIsVisible = false;
var isCtrl = false;

function initialise() {
    loadDefaultValues();
    initialiseSidebar();
    
    //Set default state of IO Panel
    showIOPanel(ioPanelIsVisible);

    //Get IO File Paths
    $("#input-InputPath").val(inputFile.path);
    $("#input-OutputPath").val(outputFile.path);
    
    //Update data if file exists
    if(fs.existsSync(inputFile.path))
        fileRead(inputFile, function(data){
            $("#inputTab").text(data);
        });
    // if(fs.existsSync(outputFile.path))
    //     fileRead(outputFile, function(data){
    //         $("#outputTab").text(data);
    //     });
    
    //Set default zoom value
    webFrame.setZoomFactor(curZoom);

    //Style: IO-Content
    var ta = document.getElementsByClassName('IO-Content');
    for(var i=0;i<2;i++) {
        var el = ta[i];
        el.style.color = 'white';
        el.style.backgroundColor = 'rgb(39, 40, 34)';
    }

    //Style Elements
    //Sidemenu Scrollbars
    $('.Sidemenu').on('mouseenter', function(){
        $('.Sidemenu::-webkit-scrollbar').fadeIn(200);
    });
    $('.Sidemenu').on('mouseleave', function(){
        $('.Sidemenu::-webkit-scrollbar').fadeOut(200);
    });

}

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
};

$(document).ready(function(){

    
    //MOUSE EVENT LISTENERS:
    //MainMenu-Button
    $('#sidebar-MainMenu').on('click', function(){
        showMainMenu(!mainMenuIsVisible);
    });

    //KEYBOARD SHORTCUT LISTENRS:

    $('body').on('keyup', function(e){
        if(e.ctrlKey) isCtrl = false;
    });
    $('body').on('keydown', function(e){
        if(e.ctrlKey) isCtrl = true;
    });
    $('body').on('keydown', function(e){
        if(isCtrl) {
            switch(e.keyCode) {
                //CTRL + N: Create new file (temporary)
                case 78 : var wt = new WorkingTab(randomIndex++, 'New File-'+(randomIndex-1));
                          wt.exists = false;
                          addWorkingFile(wt);
                          selectWorkingFile(wt);
                          break;
                //CTRL + S: Save current file
                case 83 : curFile.data = getData();
                          saveFile(curFile); 
                          break;
                //CTRL + W: Close current tab
                case 87 : closeWorkTab(curFile);
                          break;
                //CTRL + 1: Compile file
                case 49 : compile();
                          break;
                //CTRL + 2: Run file
                case 50 : run();
                          break;
                //CTRL + B: Toggle Sidemenu
                case 66 : if(sideMenuIsVisible)
                              showSideMenuContainer(false);
                          else 
                              showSideMenuContainer(true);
                          break;
                //CTRL + I: Toggle I/O Panel
                case 73 : showIOPanel(!ioPanelIsVisible);
                          break;
                //CTRL + =: Zoom in
                case 187 : zoomIn();
                           break;
                //CTRL + -: Zoom out
                case 189: zoomOut();
                          break;
                default : break;
            }
        }
    });
    $(window).resize(function(){
        showSideMenuContainer(sideMenuIsVisible);
    });
   
});

function showIOPanel(state) {
    if(state) 
        $('.IO').css("height", "200px");
    else 
        $('.IO').css("height", "0px");
    ioPanelIsVisible = state;
}
function showMainMenu(state) {
    if(state) 
        $('.MainMenu').fadeIn(150);
    else 
        $('.MainMenu').fadeOut(150);
    mainMenuIsVisible = state;
        
}
function updateSessionData(notifyUpdate) {
    fs.writeFile('./usr.json', JSON.stringify(usr), (err) => {
        if (err) {
            console.log("File update: unsuccessful!\n" + err.message);
            return;
        }
        if(notifyUpdate)
            console.log("File update: successful!");
    });
   
}
function getInputFilePath() {
    getFilePath(function(path) {
        $('#input-InputPath').val(path);
    });
}
function getOutputFilePath() {
    getFilePath(function(path) {
        $('#input-OutputPath').val(path);
    });
}
function getBuildFilePath() {
    getFilePath(function(path) {
        $('#input-BuildPath').val(path);
    });
}
function updateIOFilePath() {
    usr.inputFilePath = inputFile.path = $('#input-InputPath').val();
    usr.outputFilePath = outputFile.path = $('#input-OutputPath').val();
    usr.buildFilePath = $('#input-BuildPath').val();
    loadBuildFile(usr.buildFilePath);    
    updateSessionData(true);
}
function updateProjectFolderPath() {
    var size=projectFolderRecord.length;
    usr.projectFolders = [];
    for(var i=0;i<size;i++)
        usr.projectFolders.push(projectFolderRecord[i].path);
    updateSessionData(false);
}

function zoomIn() {
    curZoom = webFrame.getZoomFactor();
    curZoom += changeZoomBy;
    webFrame.setZoomFactor(curZoom);

    usr.curZoom = curZoom;
    updateSessionData(false);    
}
function zoomOut() {
    curZoom = webFrame.getZoomFactor();
    curZoom -= changeZoomBy;
    webFrame.setZoomFactor(curZoom);

    usr.curZoom = curZoom;
    updateSessionData(false);        
}
function loadDefaultValues() {
    //IO File Path
    inputFile.path = usr.inputFilePath;
    $('#input-InputPath').val(inputFile.path);
    
    outputFile.path = usr.outputFilePath;
    $('#input-OutputPath').val(outputFile.path);

    //Zoom Level
    curZoom = usr.curZoom;

    //Load Build File
    loadBuildFile(usr.buildFilePath);
    $('#input-BuildPath').val(usr.buildFilePath);

    //Load Language
    // setLanguage(usr.language);

    //Project Folders
    var openProjects = usr.projectFolders;
    var size = openProjects.length;
    for(var i=0;i<size;i++)
        if(fs.existsSync(openProjects[i]))
            addProjectFolder(new ProjectFolderTab(randomIndex++, openProjects[i]));
}

function loadJS(file) {
    var jsElm = document.createElement("script"); // DOM: Create the script element
    jsElm.type = "application/javascript";        // set the type attribute
    jsElm.src = file;                             // make the script element load file
    document.body.appendChild(jsElm);             // finally insert the element to the body element in order to load the script
}