var fs = require('fs');
 
function WorkingTab(id, absolutePath) {
    this.id = id;
    this.path = absolutePath;
    this.name = getDirectoryName(this.path);
    this.image = new Image('Button-CloseTab', '../images/Button-CloseTab-Def.png', '../Button-CloseTab-Sel.png');
    this.isSaved = true;
    this.exists = true;
    this.data = '';

    this.renderHTML = function() {
        return '<div class="Tab-WorkingFile" id="WT-'+this.id+'">'+ '<div class="TargetWrap">'+ this.image.renderHTML()+ '<div class="Text-Tab">'+this.name+'</div>'+ '</div>'+'</div>'; 
    };
}