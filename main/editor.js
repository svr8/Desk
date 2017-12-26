var ace, editor;
function initialiseEditor(ace) {
    // trigger extension
    ace.require("ace/ext/language_tools");
    var aceEditor = ace.edit("editor");
    aceEditor.session.setMode("ace/mode/java");
    aceEditor.setTheme("ace/theme/monokai");

    // enable autocompletion and snippets
    aceEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

    ace = ace;
    editor = aceEditor; 
    getData();  
}

function getData() {
    console.log(editor.getSession().getValue());
}

