function FolderTab(id, absolutePath) {
    this.id = id;
    this.path = absolutePath;
    this.name = getDirectoryName(this.path);
    this.image = new Image('Button-ToggleFolder', '../images/Button-ToggleFolder.png', '../images/Button-ToggleFolder.png');
    this.isExpanded = false;

    this.subFolders = [];
    this.subFiles = [];
    this.isSubDirectoriesLoaded = false;

    this.renderHTML = function () {
        return '<div class="Tab-Folder" id="FD-' + this.id + '">' +
            '<div class="TargetWrap">' +
            this.image.renderHTML() +
            '<div class="Text-Tab">' + this.name + '</div>' +
            '</div>' +
            '<div class="SubDir"></div>' +
            '</div>';
    };
}
