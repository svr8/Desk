const languageExtensionMap = {
  'java': { 
    editorRes: 'ace/mode/java',
    shellRes: {
      getCompileCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return `javac ${fileAbsolutePath}`;
      },

      getRunCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return `java -cp ${fileContainerPath} ${fileName} < ${inputFile.path} > ${outputFile.path}`;
      },

      getStopCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return 'pkill java';
      }

    } 
  },
  'c': { 
    editorRes: 'ace/mode/c_cpp',
    shellRes: {
      getCompileCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return `gcc -o ${fileContainerPath}/${fileName}.out ${fileAbsolutePath}`;
      },

      getRunCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return `${fileContainerPath}/${fileName}.out`;
      },

      getStopCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return `pkill ${fileName}.out`;
      }

    }
  },
  'cpp': { 
    editorRes: 'ace/mode/c_cpp',
    shellRes: {
      getCompileCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return `g++ -o ${fileContainerPath}/${fileName}.out ${fileAbsolutePath}`;
      },

      getRunCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return `${fileContainerPath}/${fileName}.out`;
      },

      getStopCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return `pkill ${fileName}.out`;
      }

    }
  },
  'py': { 
    editorRes: 'ace/mode/python',
    shellRes: {
      getCompileCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return `python ${fileAbsolutePath}`;
      },

      getRunCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return `python ${fileAbsolutePath}`;
      },

      getStopCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return 'pkill python';
      }
    }
  },
  'tsx': { 
    editorRes: 'ace/mode/tsx',
    shellRes: {
      getCompileCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return ``;
      },

      getRunCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return ``;
      },

      getStopCommand: (fileAbsolutePath, fileContainerPath, fileName) => {
        return '';
      }

    }
  },
};

const getLanguage = extension => {
  if(languageExtensionMap[extension])
    return languageExtensionMap[extension];
  return languageExtensionMap.tsx;
}