import { Editor, MarkdownView, Plugin } from 'obsidian';


function getOutlineDepth(lineText: string) {
	const whitespacePrefix = /^\s*/.exec(lineText)
	if (whitespacePrefix) {
		return whitespacePrefix[0].length
	} else return 0;
}

function selectOutline(editor: Editor) {
	const { line } = editor.getCursor();
	const lineText = editor.getLine(line);
	const outlineLevel = getOutlineDepth(lineText);
	let lastLine = line;
	for (let i = line + 1; i < editor.lineCount() && getOutlineDepth(editor.getLine(i)) > outlineLevel; i++) {
		lastLine = i;
	}

	const selectionEnd = lastLine + 1 < editor.lineCount() ? { line: lastLine + 1, ch: 0 } : { line: lastLine, ch: editor.getLine(lastLine).length };
	editor.setSelection({ line, ch: 0 }, selectionEnd);
}

export default class ListOutlineHelperPlugin extends Plugin {

	async onload() {

		this.addCommand({
			id: 'select-current-list-outline',
			name: 'Select current list outline',
			editorCallback: (editor: Editor) => {
				selectOutline(editor);
			}
		});
	}

	onunload() {
	}
}
