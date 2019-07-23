const {webFrame} = require('electron');
const configFile = require('electron-json-config');

//Default Configs
var config = {
    "startup":"true",
    
    "inputFilePath":"",
    "outputFilePath":"",
    "defaultLanguageExtension": "java",
    
    "curZoom":"1",
    
    "projectFolders": [],
}

var curZoom = 1,
    changeZoomBy = 0.2;

var ioPanelIsVisible = false;
var SettingsIsVisible = false;
var isCtrl = false;

var randomIndex = 0;

var curLang = {};

function initialise() {
    loadDefaultValues();
    initialiseSidebar();
    
    //First startup
    if(config.startup) {
        showSettings(true);
        config.startup = false;
        updateSessionData(false);
    }
    //Set default state of IO Panel
    showIOPanel(ioPanelIsVisible);

    //Set default state of Editor
    showEditor(isEditorVisible);

    //Default Language Mode
    curLang = getLanguage(config.defaultLanguageExtension);

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
        $('#sidebar-Settings').hover(function(e) {
            if(timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function() {
                if(isHovering( $('#sidebar-Settings') ))
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
    initialise();
    //MOUSE EVENT LISTENERS:
    //Settings-Button
    $('#sidebar-Settings').on('click', function(){
        showSettings(!SettingsIsVisible);
    });
    //Create File Button
    $('#create-new-file').on('click', function(){
        var parent = $("#FD-"+curFolder.id).find('.SubDir').first();
        parent.append(renderTempTabHTML());
        
        var el = $('.Tab-Temp input');        
        el.focus();
        
        $(el).bind('blur keydown',function(e) { 
            if(e.keyCode === 27) el.remove(); 
            else if (e.type === 'blur' || e.keyCode === 13)  
                processNewFileData(el);    
       });   
    });
    function processNewFileData(el) {
        if(isValidNewFile(curFolder, el.val()) || el.val().length==0)
            $('.Tab-Temp').remove();      
        else 
            el.focus();
    }

    //Create Folder Button
    $('#create-new-folder').on('click', function(){
        var parent = $("#FD-"+curFolder.id).find('.SubDir').first();
        parent.append(renderTempTabHTML());
  
        var el = $('.Tab-Temp input');        
        el.focus();
      
        $(el).bind('blur keyup',function(e) {  
            if(e.keyCode === 27) el.remove();
            else if ( e.type === 'blur' || e.keyCode === 13 ) 
                processNewFolderData(el);  
       });    
    });
    function processNewFolderData(el) {
        if(isValidNewFolder(curFolder, el.val()) || el.val().length==0)
            el.remove();      
        else 
            el.focus(); 
    }

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
                //CTRL + PageUp : Toggle Work File Upwards
                case 33 : toggleWorkFile(false);
                          break;
                //CTRL + PageDown : Toggle Work File Downwards
                case 34 : toggleWorkFile(true);
                          break;
                //CTRL + =: Zoom in
                case 187 : zoomIn();
                           break;
                //CTRL + -: Zoom out
                case 189: zoomOut();
                          break;
                default : console.log('nigga wut?!?!'); break;
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
function showSettings(state) {
    SettingsIsVisible = state;
    
    if(SettingsIsVisible) {
        $('.Settings').fadeIn(150);
        $("#sidebar-Settings").css('background-image', "url('images/Button-CloseTab-Sel.png')");
        $('.Sidebar').css({'box-shadow': '0px 0px 8px black', 'z-index':'3'});

        // hide sidebar buttons
        $(".Sidebar-Button").hide();
        $("#sidebar-Settings").show(); // hack
    }
    else {
        $('.Settings').fadeOut(150);
        $("#sidebar-Settings").css('background-image', "url('images/Settings-Def.png')");
        $('.Sidebar').css('box-shadow', 'none');

        // show sidebar buttons
        $(".Sidebar-Button").show();        
    }
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
function updateIOFilePath() {
    config.inputFilePath = inputFile.path = $('#input-InputPath').val();
    config.outputFilePath = outputFile.path = $('#input-OutputPath').val();
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

    //Project Folders
    var openProjects = config.projectFolders;
    var size = openProjects.length;
    for(var i=0;i<size;i++)
        if(fs.existsSync(openProjects[i]))
            addProjectFolder(new ProjectFolderTab(randomIndex++, openProjects[i]));
    console.log(':'+randomIndex);
}

function loadJS(file) {
    var jsElm = document.createElement("script"); // DOM: Create the script element
    jsElm.type = "application/javascript";        // set the type attribute
    jsElm.src = file;                             // make the script element load file
    document.body.appendChild(jsElm);             // finally insert the element to the body element in order to load the script
}
