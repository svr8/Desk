function executeCompile(fileAbsolutePath, fileContainerPath, fileName) {
    execute('javac '+fileAbsolutePath, function(error, stderr, stdout) {
        displayCompileResults(error, stderr, stdout); 
    });
}
function executeRun(fileAbsolutePath, fileContainerPath, fileName) {
    execute('java -cp '+fileContainerPath+' '+fileName+' < '+inputFile.path+' > '+outputFile.path, function(error, stderr, stdout) {
        displayRunResults(error, stderr, stdout);
    });
}