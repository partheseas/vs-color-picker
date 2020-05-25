import vscode, { commands, Position, Selection, window } from 'vscode';
import color, { ColorType } from './color';

const isThereAColorHere = /(#[0123456789abcdefABCDEF]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\))|rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*[\d\.]+\s*\)|hsl\(\s*\d{1,3}\s*,\s*[\d\.]{1,3}%\s*,\s*[\d\.]{1,3}%\s*\)/g;

export function activate({ subscriptions }: vscode.ExtensionContext) {
  subscriptions.push(
    commands.registerTextEditorCommand(
      'vs-color-picker.pickColor',
      editor => {
        let initialColor;

        // Find existing colors that we might be trying to replace
        let replaceTargets = editor.selections.map<Selection>(selection => {
          if (selection.start.line !== selection.end.line) {
            window.showErrorMessage('This extension does not support multiple line selections.');
            throw new Error('Selection spans multiple lines');
          }

          let line = editor.document.lineAt(selection.start).text;
          if (line.length > 200) {
            window.showErrorMessage('This extension does not support lines this long');
            throw new Error('Selection/line is too long');
          }

          let result;
          // If the end of the match is before the beginning of the selection,
          // then continue searching.
          do {
            result = isThereAColorHere.exec(line);
          } while (result && result.index + result[0].length < selection.start.character);

          // Reset the regular expression (prevents bugs when multiple colors
          // and multiple selections are on one line or when multiple cursors
          // are on different lines with matching contents)
          isThereAColorHere.exec('');

          // Make sure that the beginning of the match is before or equal to the
          // beginning of the selection. If not, the match is invalid.
          if (result && result.index <= selection.start.character) {
            let [previousColor] = result;
            if (!initialColor) initialColor = previousColor;

            let lineNumber = selection.start.line;
            let start = result.index;
            let end = start + previousColor.length;

            return new Selection(lineNumber, start, lineNumber, end);
          } else return selection;
        });

        // If we didn't detect any colors, use a random one as a starting value.
        if (!initialColor) initialColor = color.hex(color.random());

        window.showInputBox({ prompt: 'Color', value: initialColor }).then(color => {
          if (color) {
            editor.edit(ee => {
              replaceTargets.forEach(target => {
                // TODO: Apply these selections to the editor maybe?
                // It might also be fine the way it is. It doesn't behave
                // *super* cnosistently, but it also isn't bad.
                ee.replace(target, color);
              });
            });
          }
        });
      }
    )
  );
}

export function deactivate() {}
