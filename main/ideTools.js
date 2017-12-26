var exec = require('child_process').exec;
var stopPressed = false;
$(document).ready(function(){
    $('#compileBtn').on('click', function(){
        compile();
    });
    $('#runBtn').on('click', function(){
        run();
    });
    $('#stopBtn').on('click', function(){
        if(!stopPressed) {
            stopPressed = true;
            stop();
        }
    });
});
function compile() {
    var fileAbsolutePath = curFile.path,
        fileContainerPath = getDirectoryParentPath(curFile.path),
        fileName = curFile.name.substr(0, curFile.name.indexOf("."));
    
    //Save current file
    curFile.data = getData();
    saveFile(curFile);
    
    //Status Update
    console.log('Compiling...');
    $('#outputTab').val('Compiling...');
    
    //Show IO Panel
    showIOPanel(true);

    //Compile code
    executeCompile(fileAbsolutePath, fileContainerPath, fileName);
}
function run() {
    var fileAbsolutePath = curFile.path,
        fileContainerPath = getDirectoryParentPath(curFile.path),
        fileName = curFile.name.substr(0, curFile.name.indexOf("."));
   
    //Save input file
    inputFile.data = $('#inputTab').val();
    saveFile(inputFile);

    //Status Update    
    console.log('Executing...');
    $('#outputTab').val('Executing...');

    //Show IO Panel
    showIOPanel(true);
    
    //Execute code
    executeRun(fileAbsolutePath, fileContainerPath, fileName);
}
function stop() {
    execute('Taskkill /IM java.exe /F', function(error, stderr, stdout) {
        displayCompileResults(error, stderr, stdout);
        $('#outputTab').val('Process Stopped!');
        stopPressed = false;
    });
}
function displayCompileResults(error, stderr, stdout) {
    var out = '';
    // if(error!=null)
    //     out = out+error+'\n';
    if(stderr.length>0)
        out = out+stderr+'\n';
    if(stdout.length>0)
        out = out+stdout+'\n';
    out = out+'Compile Process Completed!';
    $('#outputTab').val(out);
}
function displayRunResults(error, stderr, stdout) {
    var out = '';
    // if(error!=null)
    //     out = out+error+'\n';
    if(stderr.length>0)
        out = out+stderr+'\n';
    if(stdout.length>0)
        out = out+stdout+'\n';
    if(stopPressed)
        $('#outputTab').val('Execution Interrupted!');
    else        
        fileRead(outputFile, function(data){
            out = out+data+'Execution Completed!';
            $('#outputTab').val(out);
        });
}
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(error, stderr, stdout); });
};


