$(document).ready(function() {
  
  $('.settings-content').hide();

  


});

const showSetting = (settingID) => {
  $('.settings-content').hide();
  $(`#${settingID}`).show();
}