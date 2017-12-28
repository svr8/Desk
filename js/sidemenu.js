function SideMenu(id) {
    this.id = id;
    this.toggleBtnId = 'sidebar-'+this.id;
    this.isSelected = false;
}
function initialiseSideMenu(menu) {
    $('#'+menu.toggleBtnId).on("click", function(){
        //If menu wasn't already selected
        if(!menu.isSelected) {
            selectSideMenu(menu);          //Select this menu
            showSideMenuContainer(true);
        }
        //If this menu was already selected
        else {
            selectSideMenu(nullSideMenu);  //Hide sidemenu    
            showSideMenuContainer(false);
        }
    });
    $('#'+menu.toggleBtnId).on('mouseenter', function(){
        $('#'+menu.toggleBtnId).css("background-image", "url('./images/"+menu.toggleBtnId+"-Sel.png')");
    });
    $('#'+menu.toggleBtnId).on('mouseleave', function(){
        if(!menu.isSelected)
            $('#'+menu.toggleBtnId).css("background-image", "url('./images/"+menu.toggleBtnId+"-Def.png')");
    });
}

var sidemenu = [
        new SideMenu("CurrentFolder"),
        new SideMenu("OpenFolders")
];

var nSideMenu = 2;
var nullSideMenu = new SideMenu('NullSideMenu', '');
var curSideMenu = nullSideMenu;
var sideMenuIsVisible = true;

function showSideMenu(menu) {
    menu.isSelected = true;
    $("#"+menu.id).show();   
    $('#'+menu.toggleBtnId).css("background-image", "url('./images/"+menu.toggleBtnId+"-Sel.png')");
}
function hideSideMenu(menu) {
    menu.isSelected = false;
    $("#"+menu.id).hide();   
    $('#'+menu.toggleBtnId).css("background-image", "url('./images/"+menu.toggleBtnId+"-Def.png')");
}
function selectSideMenu(menu) {
    hideSideMenu(curSideMenu);
    curSideMenu = menu;
    showSideMenu(curSideMenu);
}

function showSideMenuContainer(state) {
    sideMenuIsVisible = state;
    if(sideMenuIsVisible) {
        $(".Sidemenu").show();
        if(curSideMenu==nullSideMenu)
            selectSideMenu(sidemenu[0]);
       
        //Reposition/Resize .Editor, .IO
        $("#editor, .IO").css("left", $('.Sidemenu').offset().left+$('.Sidemenu').width()+3);
        $("#editor, .IO").width($(window).width()-$('.Sidebar').width()-$('.Sidemenu').width()-3);
    }
    else {
        $(".Sidemenu").hide();        
        selectSideMenu(nullSideMenu);
        //Reposition/Resize .Editor, .IO
        $("#editor, .IO").css("left", $('.Sidebar').width());
        $("#editor, .IO").width($(window).width()-$('.Sidebar').width());
    }
}
function initialiseSidebar() { 
    for(var i=0;i<nSideMenu;i++) {
        var menu = sidemenu[i];
        initialiseSideMenu( menu );
        selectSideMenu(menu);
    }
};