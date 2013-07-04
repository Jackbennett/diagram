  function setup_editor(div) {

	var editor_div = div.find(".editor");
	var diagram_div = div.find(".diagram");

	// Setup the editor diagram
	var editor = ace.edit(editor_div.get(0));
	editor.setTheme("ace/theme/crimson_editor");
	editor.getSession().setMode("ace/mode/asciidoc");
	editor.getSession().on('change', _.debounce(on_change, 100));

	on_change();

	function on_change() {
		try {
			var diagram = Diagram.parse(editor.getValue());

			editor.getSession().setAnnotations([]);

			// Clear out old diagram
			diagram_div.html('');

			var options = {
				scale: 1
		};

		// Draw
		diagram.drawSVG(diagram_div.get(0), options);

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
			editor.getSession().setAnnotations([annotation]);
			throw err;
		}
	}
}

	$(document).ready(function() {
		// Example diagrams
		//$('.diagram').sequenceDiagram();

		// Setup all the editors
		setup_editor($('#demo'));
		setup_editor($('#example1'));
		setup_editor($('#example2'));
		setup_editor($('#example3'));
	});