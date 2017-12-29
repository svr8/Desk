const {webFrame} = require('electron');
const configFile = require('electron-json-config');

//Default Configs
var config = {
    "inputFilePath":"",
    "outputFilePath":"",
    "curZoom":"1",
    "language":"java",
    "buildFilePath":"",
    "projectFolders":[]
}

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

    //Set default state of Editor
    showEditor(isEditorVisible);

    //Style: IO-Content
    var ta = document.getElementsByClassName('IO-Content');
    for(var i=0;i<2;i++) {
        var el = ta[i];
        el.style.color = 'white';
        el.style.backgroundColor = 'rgb(39, 40, 34)';
    }
    //Display Element Name on hover(hover and hold)
        var timer;
        $('*').hover(function(){
            $(this).data('hover',1); //store in that element that the mouse is over it
        },
        function(){
            $(this).data('hover',0); //store in that element that the mouse is no longer over it
        });
        $('#sidebar-MainMenu').hover(function(e) {
            if(timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function() {
                if(isHovering( $('#sidebar-MainMenu') ))
                    showElementName(e, 'Main Menu');                
            }, 1000)
        }, function(){
        });
        $('#sidebar-CurrentFolder').hover(function(e) {
            if(timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function() {
                if(isHovering( $('#sidebar-CurrentFolder') ))
                    showElementName(e, 'Current Folder');                
            }, 1000)
        }, function(){
        });
        $('#sidebar-OpenFolders').hover(function(e) {
            if(timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function() {
                if(isHovering( $('#sidebar-OpenFolders') ))
                    showElementName(e, 'Open Projects');                
            }, 1000)
        }, function(){
        });
        $('#Button-OpenFolder').hover(function(e) {
            if(timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function() {
                if(isHovering( $('#Button-OpenFolder') ))
                    showElementName(e, 'Add New Project');                
            }, 1000)
        }, function(){
        });
        $('#compileBtn').hover(function(e) {
            if(timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function() {
                if(isHovering( $('#compileBtn') ))
                    showElementName(e, 'Compile');                
            }, 1000)
        }, function(){
        });
        $('#runBtn').hover(function(e) {
            if(timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function() {
                if(isHovering( $('#runBtn') ))
                    showElementName(e, 'Execute');                
            }, 1000)
        }, function(){
        });
        $('#stopBtn').hover(function(e) {
            if(timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function() {
                if(isHovering( $('#stopBtn') ))
                    showElementName(e, 'Stop');                
            }, 1000)
        }, function(){
        });
        $('#create-new-file').hover(function(e) {
            if(timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function() {
                if(isHovering( $('#create-new-file') ))
                    showElementName(e, 'New File');                
            }, 1000)
        }, function(){
        });
        $('#create-new-folder').hover(function(e) {
            if(timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function() {
                if(isHovering( $('#create-new-folder') ))
                    showElementName(e, 'New Folder');                
            }, 1000)
        }, function(){
        });
        
        $('body').on('mousemove', function(){
            hideElementName();
        });
        
    //Style Elements
    //Sidemenu Scrollbars
    $('.Sidemenu').on('mouseenter', function(){
        $('.Sidemenu::-webkit-scrollbar').fadeIn(200);
    });
    $('.Sidemenu').on('mouseleave', function(){
        $('.Sidemenu::-webkit-scrollbar').fadeOut(200);
    });


    //Get IO File Paths
    $("#input-InputPath").val(inputFile.path);
    $("#input-OutputPath").val(outputFile.path);
    
    //Update data if file exists
    if(fs.existsSync(inputFile.path))
        fileRead(inputFile, function(data){
            $("#inputTab").text(data);
        });
    
    //Set default zoom value
    webFrame.setZoomFactor(curZoom);

}
function isHovering(selector) {
    return $(selector).data('hover')?true:false; //check element for hover property
}
jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
};
function showElementName(e, name) {
    $('#elementName').html(name);
    $('#elementName').css('left', e.pageX+'px');
    $('#elementName').css('top', e.pageY+'px');
    $('#elementName').fadeIn(150);
}
function hideElementName() {
    $('#elementName').fadeOut(150);
}
$(document).ready(function(){
    //MOUSE EVENT LISTENERS:
    //MainMenu-Button
    $('#sidebar-MainMenu').on('click', function(){
        showMainMenu(!mainMenuIsVisible);
    });
    //Create File Button
    $('#create-new-file').on('click', function(){
        var parent = $("#FD-"+curFolder.id).find('.SubDir').first();
        parent.append(renderTempTabHTML());
        var el = $('.Tab-Temp input');        
        el.focus();
        el.blur(function(){
            if(isValidNewFile(curFolder, el.val()) || el.val().length==0)
                $('.Tab-Temp').hide();      
            else 
                el.focus();          
        });
    });
    //Create Folder Button
    $('#create-new-folder').on('click', function(){
        var parent = $("#FD-"+curFolder.id).find('.SubDir').first();
        parent.append(renderTempTabHTML());
        var el = $('.Tab-Temp input');        
        el.focus();
        el.blur(function(){
            if(isValidNewFolder(curFolder, el.val()) || el.val().length==0)
                el.hide();      
            else 
                el.focus();          
        });
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
                case 78 : var wt = new WorkingTab(randomIndex++, 'New File');
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
                //CTRL + 3: Stop Execution
                case 51 : stop();
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
            isCtrl = false;
        }
    });
    $(window).resize(function(){
        showSideMenuContainer(sideMenuIsVisible);
    });
   
});
function renderTempTabHTML() {
    expandFolder(curFolder);
    return '<div class="Tab-Temp"><input></div>';
}
function showIOPanel(state) {
    if(state)  {
        $('.IO').css("height", "200px");
        // $("#editor").height($(window).height()-200);        
    }
    else  {
        $('.IO').css("height", "0px");
        // $("#editor").height($(window).height());
    }
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
    configFile.set('config', config);
    if(notifyUpdate)
        console.log('Settings updated successfully');
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
    config.inputFilePath = inputFile.path = $('#input-InputPath').val();
    config.outputFilePath = outputFile.path = $('#input-OutputPath').val();
    config.buildFilePath = $('#input-BuildPath').val();
    loadBuildFile(config.buildFilePath);            
    updateSessionData(true);
    alert('Path has been updated.');
}
function updateProjectFolderPath() {
    var size=projectFolderRecord.length;
    config.projectFolders = [];
    for(var i=0;i<size;i++)
        config.projectFolders.push(projectFolderRecord[i].path);
    updateSessionData(false);
}

function zoomIn() {
    curZoom = webFrame.getZoomFactor();
    curZoom += changeZoomBy;
    webFrame.setZoomFactor(curZoom);

    config.curZoom = curZoom;
    updateSessionData(false);    
}
function zoomOut() {
    curZoom = webFrame.getZoomFactor();
    curZoom -= changeZoomBy;
    webFrame.setZoomFactor(curZoom);

    config.curZoom = curZoom;
    updateSessionData(false);        
}
function loadDefaultValues() {
    if(configFile.has('config')) //When application loads for the first time
        config = configFile.get('config');
    else
        configFile.set('config', config);
    
    //IO File Path
    inputFile.path = config.inputFilePath;
    $('#input-InputPath').val(inputFile.path);
    
    outputFile.path = config.outputFilePath;
    $('#input-OutputPath').val(outputFile.path);

    //Zoom Level
    curZoom = config.curZoom;

    //Load Build File
    loadBuildFile(config.buildFilePath);
    $('#input-BuildPath').val(config.buildFilePath);

    //Load Language
    // setLanguage(config.language);

    //Project Folders
    var openProjects = config.projectFolders;
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