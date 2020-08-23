export const defaultConfig = {
  "startup": true,
  
  "inputFilePath":"in.txt",
  "outputFilePath":"out.txt",
  "projectFolders": [],
  "ignoreFileList": [
    "class",
    "out"
  ],
  
  "curZoom": 1,

  "languageExtensionMap": {
    'java': { 
      editorRes: 'ace/mode/java',
      compileCommand: 'javac ${fileAbsolutePath}',
      runCommand: 'java -cp ${fileContainerPath} ${fileName} < ${inputFile.path} > ${outputFile.path}',
      stopCommand: 'pkill java',
    },
    'c': { 
      editorRes: 'ace/mode/c_cpp',
      compileCommand: 'gcc -o ${fileContainerPath}/${fileName}.out ${fileAbsolutePath}',
      runCommand: '${fileContainerPath}/${fileName}.out < ${inputFile.path} > ${outputFile.path}',
      stopCommand: 'pkill ${fileName}.out',
    },
    'cpp': { 
      editorRes: 'ace/mode/c_cpp',
      compileCommand: 'g++ -o ${fileContainerPath}/${fileName}.out ${fileAbsolutePath}',
      runCommand: '${fileContainerPath}/${fileName}.out < ${inputFile.path} > ${outputFile.path}',
      stopCommand: 'pkill ${fileName}.out',
    },
    'py': { 
      editorRes: 'ace/mode/python',
      compileCommand: 'python ${fileAbsolutePath}',
      runCommand: 'python ${fileAbsolutePath} < ${inputFile.path} > ${outputFile.path}',
      stopCommand: 'pkill python',
    },
    'tsx': { 
      editorRes: 'ace/mode/tsx',
      compileCommand: 'echo Cannot Compile .tsx',
      runCommand: 'echo Cannot Run .tsx',
      stopCommand: 'echo Cannot Stop .tsx',
    },
  },
};