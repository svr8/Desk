function Image(className, def, sel) {
    this.className = className;
    this.def = def;
    this.sel = sel;
    this.renderHTML = function() {
        return '<div class="'+this.className+'"></div>';
    }
}