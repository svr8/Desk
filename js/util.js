function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Define functin to find and replace specified term with replacement string */
function replaceAll(str, term, replacement) {
return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

function getExtension(filePath) {
  let index = filePath.indexOf(".");
  if(index == -1) return '';
  return filePath.substring(index+1);
}