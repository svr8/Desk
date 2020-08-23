var sidemenu = [
    new SideMenu("CurrentFolder"),
    new SideMenu("OpenFolders")
];

var nSideMenu = 2;
var nullSideMenu = new SideMenu('NullSideMenu', '');
var curSideMenu = nullSideMenu;
var sideMenuIsVisible = true;