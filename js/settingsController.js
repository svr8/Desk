$(document).ready(function() {
  
  $('.settings-content').hide();
  $('#edit-build').hide();

  
  $("#extension-chooser-trigger").on('click', () => {
    let displayState = $("#extension-chooser-list").css('display');
    console.log(displayState)
    displayState = displayState=='block' ? 'none' : 'block';
    $("#extension-chooser-list").css('display', displayState);

    if(displayState == 'block') {
      let html = '';
      for(let extensionName in languageExtensionMap)
        html += `<div class="setting-card-dropdown-list-item">${extensionName}</div>`;
      console.log(html);
      $("#extension-chooser-list").html(html);

      $("#update-build .setting-card-dropdown-list-item").click( function(event) {
        let ext = $(this).html()
        onExtensionSelect(ext);
      });
    }
  });

  $("#update-build .setting-card-dropdown-list-item").click( function(event) {
    let ext = $(this).html()
    onExtensionSelect(ext);
  });


});

const onExtensionSelect = (ext) => {
  const lang = getLanguage(ext);
  $("#extension-chooser-trigger").html(ext);
  $("#extension-chooser-list").css('display', 'none');
  
  $("#edit-build").show();
}

// TODO
const onUpdateExtension = function(ext, editorRes, compileCommand, runCommand, stopCommand) {

  languageExtensionMap[ext] = {
    editorRes: editorRes,
    shellRes: {
      getCompileCommand: function (fileAbsolutePath, fileContainerPath, fileName) {
        return eval(compileCommand);
      },

      getRunCommand: function (fileAbsolutePath, fileContainerPath, fileName) {
        return eval(runCommand);
      },

      getStopCommand: function (fileAbsolutePath, fileContainerPath, fileName) {
        return eval(stopCommand);
      },
    }
  }
}
const showSetting = (settingID) => {
  console.log(settingID);
  $('.settings-content').hide();
  $(`#${settingID}`).show();
}

const showSubContent = (contentID) => {
  $(".setting-sub-content").hide();
  $(`#${contentID}`).show();
}