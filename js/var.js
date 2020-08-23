// Application Configurations
var curZoom = 1;
var changeZoomBy = 0.2;

var ioPanelIsVisible = false;
var SettingsIsVisible = false;
var isCtrl = false;

var randomIndex = 0;

var config = {};

// Sidemenu
var sidemenu = [
  new SideMenu("CurrentFolder"),
  new SideMenu("OpenFolders")
];
var nSideMenu = 2;
var nullSideMenu = new SideMenu('NullSideMenu', '');
var curSideMenu = nullSideMenu;
var sideMenuIsVisible = true;

// tabFolder
var slideAnimationSpeed = 60;
var folderRecord = [];
var curFolder = null;

// tabProjectFolder
var projectFolderRecord = [];

// tabWorking
var curFile = null;
var workfileRecord = [];
var inputFile=new WorkingTab(-1, '');
var outputFile=new WorkingTab(-1, '');