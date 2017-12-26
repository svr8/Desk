var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');

var os = require('os');
var slash = (os.type() == 'Windows_NT') ? '\\' : '/';


//Load user session data
var jsonfile = require('jsonfile');
var usrFilePath = '../usr.json';
var usr = require(usrFilePath);

var randomIndex = 0;


//Open Folder Button Listener
$(document).ready(function() {
    //Activate Button: Open Project Folder
    $('#Button-OpenFolder').unbind('click').bind('click', function(){ //it was triggered two times, donno why, stackoverflow ftw;_;
        dialog.showOpenDialog({
            title:"Select a folder",
            properties: ["openDirectory"]
        }, (folderPaths) => {
            // folderPaths is an array that contains all the selected paths
            if(folderPaths === undefined){
                console.log("No destination folder selected");
            } else{
                pf = new ProjectFolderTab(randomIndex++, folderPaths[0]);
                addProjectFolder(pf);
            }
        });
    });
});

function fileRead(file, callback) {
    //Update Status
    console.log('Reading File');
    if (!fs.existsSync(file.path)) {
        alert('File not found!');
        return;
    }
    fs.readFile(file.path, 'utf-8', (err, data) => {
        if(err){
            alert("File read: unsuccessful!\n" + err.message);
            return;
        }
        callback(data);
    });
}

function saveFile(file) {
    //Update status
    console.log('Saving File');

    //If file does not exist
    if (!file.exists)
        createNewFile(file);
    //If file exists, update file
    else
        fs.writeFile(file.path, file.data, (err) => {
            if (err) {
                alert("File update: unsuccessful!\n" + err.message);
                return;
            }
            console.log("File update: successful!");
        });
}

function createNewFile(file) {
    //Update Status
    console.log('Creating New File');

    dialog.showSaveDialog((path) => {
        if (path === undefined){
            console.log("You didn't save the file");
            return;
        }
    
        fs.writeFile(path, file.data, (err) => {
            if(err)
                alert('File create: unsuccessful!\n'+err.message);
            else {                        
                console.log("File create: successful!");
                file.path = path;
                file.name = getDirectoryName(file.path);
                $("#WT-"+file.id+" .Text-Tab").html(file.name);
                reloadFolder(folderReference(getDirectoryParentPath(file.path)))
            }
        });
    });
}

//Get list of subdirectories/files inside the 'folder'
function getDirectoryContents(folder, callback) {
    console.log("FOLDER READING: "+folder.path);
    fs.readdir(folder.path, (err, dir)=>{
        for(var i=0;i<dir.length;i++) {
            if(dir[i].indexOf(".")==-1)
                folder.subFolders.push(new FolderTab(randomIndex++, folder.path+slash+dir[i]));
            else
                folder.subFiles.push(new FileTab(randomIndex++, folder.path+slash+dir[i]));
        }
        callback();
    });
}

//returns name of file/folder from absolutePath
function getDirectoryName(absolutePath) {
    return absolutePath.substr(
        absolutePath.lastIndexOf(slash)+1
    );
}
//returns parentDirectory
function getDirectoryParentPath(absolutePath) {
    return absolutePath.substr(
        0, absolutePath.lastIndexOf(slash)
    );
}

function getFilePath(callback) {
    dialog.showOpenDialog((filepath) => {
        // fileNames is an array that contains all the selected
        if(filepath === undefined){
            console.log("No file selected");
            return;
        }
        callback(filepath[0]);
    });
}

function loadBuildFile(buildFilePath) {
    if (fs.existsSync(buildFilePath)) {
        loadJS(buildFilePath);
        console.log('Build file loaded successfully');
    }
    else {
        alert('Build file not found.');
    }
}