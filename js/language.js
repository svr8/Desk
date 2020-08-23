const getLanguage = extension => {
  if (config.languageExtensionMap[extension])
    return config.languageExtensionMap[extension];
  return config.languageExtensionMap.java;
}