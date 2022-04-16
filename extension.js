const vscode = require('vscode');
const jsonTransform = require('./src/json-transform');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "convert-json-format-to-eslint" is now active!');

	const command = vscode.commands.registerCommand('convert-json-format-to-eslint.helloWorld', function () {
		const editor = vscode.window.activeTextEditor;
		const document = editor.document;

		editor.edit(editBuilder => {
		  editor.selections.forEach(sel => {
			  const selectionRange = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
			  const textSelected = document.getText(selectionRange);

				const newObjectHowString = jsonTransform(textSelected);
				editBuilder.replace(selectionRange, newObjectHowString);
			});
		});

		// vscode.window.showInformationMessage('Hello World from Convert Json Format to ESlint!');
	});

	context.subscriptions.push(command);
}

module.exports = {
	activate,
}
