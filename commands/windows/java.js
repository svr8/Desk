function getCompileCommand(fileAbsolutePath, fileContainerPath, fileName) {
    return'javac '+fileAbsolutePath;
}
function getRunCommand(fileAbsolutePath, fileContainerPath, fileName) {
    return 'java -cp '+fileContainerPath+' '+fileName+' < '+inputFile.path+' > '+outputFile.path;
}
function getStopCommand() {
   return 'Taskkill /IM java.exe /F';
}