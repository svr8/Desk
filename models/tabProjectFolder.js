var projectFolderRecord = [];
function ProjectFolderTab(id, absolutePath) {
    this.id = id;
    this.path = absolutePath;
    this.name = getDirectoryName(this.path);
    this.image = new Image('Button-CloseTab', '../images/Button-ToggleFolder-Def.png', '../images/Button-ToggleFolder-Sel.png');
    this.subFolders = [];
    this.subFiles = [];

    this.renderHTML = function () {
        return '<div id="PF-' + id + '" class="Tab-ProjectFolder">' +
            '<div class="TargetWrap">' +
            this.image.renderHTML() +
            '<div class="Text-Tab">' + this.name + '</div>' +
            '</div>' +
            '</div>';
    };
}