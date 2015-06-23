function setup_editor(div) {

  var editor_div = div.find(".editor");
  var diagram_div = div.find(".diagram");

  // Setup the editor diagram
  // editor.getSession().setMode("ace/mode/asciidoc");
  editor_div.on('keyup', _.debounce(on_change, 200));

  on_change();

  function on_change() {
    try {
      var diagram = Diagram.parse(editor_div.val());

      // Clear out old diagram
      diagram_div.html('');

      // Draw
      diagram.drawSVG(diagram_div.get(0));

    } catch(err) {
      var annotation = {
        type: "error", // also warning and information
        column: 0,
        row: 0,
        text: err.message
      };
      if (err instanceof Diagram.ParseError) {
        annotation.row	= err.loc.first_line - 1;
        annotation.column = err.loc.first_column;
      }

      throw err;
    }
  }
}

$(document).ready(function() {
  setup_editor($('#pad'));
});
