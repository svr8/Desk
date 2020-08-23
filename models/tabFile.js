function FileTab(id, absolutePath) {
    this.id = id;
    this.path = absolutePath;
    this.name = getDirectoryName(this.path);
    // this.image = new Image('Button-DeleteTab', 'images/image.png', 'images/image.png');

    this.renderHTML = function() {
        return '<div class="Tab-File">'+ '<div id="FL-'+this.id+'" class="TargetWrap">'+ '<div class="Text-Tab">'+this.name+'</div>'+ '</div>'+'</div>'; 
    };
}
