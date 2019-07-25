const getLanguage = extension => {
  if(languageExtensionMap[extension])
    return languageExtensionMap[extension];
  return languageExtensionMap.java;
}