# @markmirror/menubar

Menubar actions for the MarkMirror Markdown editor.

## Usage

```js
import { MarkMirror } from "@markmirror/core"
import { Menubar, updateMenubar } from "@markmirror/menubar"

const editor = new MarkMirror()

// Menubar requires `editor` as parameter
const menubar = new Menubar(editor, ["bold", "italic", "codespan", "|", "ul", "ol", "|", "h1", "h2"])

// update menubar active status with `updateMenubar` extension
editor.addExtension(updateMenubar(menubar))

// mount `menubar.element`
document.getElementById('menubar')!.appendChild(menubar.element)
```

## Actions

- undo
- redo
- bold
- italic
- codespan
- link
- image
- strikethrough
- codeblock
- blockquote
- hr
- ul
- ol
- h1
- h2
- h3
- h4
- h5
- h6

When `undo` or `redo` is included, `MarkMirror` requires a history extension:

```js
import { MarkMirror, localHistory } from "@markmirror/core"

const editor = new MarkMirror({ extensions: [ localHistory ]})
```
