import {
  toggleBold,
  toggleItalic,
  toggleInlineCode,
  toggleLink,
  toggleImage,
  toggleStrikethrough,
  toggleBlockcode,
  toggleBlockquote,
  toggleBulletList,
  toggleOrderedList,
  toggleH1,
  toggleH2,
  toggleH3,
  toggleH4,
  toggleH5,
  toggleH6,
  onSelectionSet,
  MarkMirror,
} from "@markmirror/core"
import { EditorView } from "@codemirror/view"
import { StateCommand as AltStateCommand } from "@codemirror/state"
import { undo, redo } from "@codemirror/commands"

declare type StateCommand = (view: EditorView) => boolean | AltStateCommand;

export class Menubar {
  private actionMap : {[key: string]: StateCommand} = {
    'undo': undo,
    'redo': redo,
    'bold': toggleBold,
    'italic': toggleItalic,
    'codespan': toggleInlineCode,
    'link': toggleLink,
    'image': toggleImage,
    'strikethrough': toggleStrikethrough,
    'codeblock': toggleBlockcode,
    'blockquote': toggleBlockquote,
    'ul': toggleBulletList,
    'ol': toggleOrderedList,
    'h1': toggleH1,
    'h2': toggleH2,
    'h3': toggleH3,
    'h4': toggleH4,
    'h5': toggleH5,
    'h6': toggleH6,
  }

  public typeMap : {[key: string]: string} = {
    "StrongEmphasis": "bold",
    "Emphasis": "italic",
    "InlineCode": "codespan",
    "Link": "link",
    "Image": "image",
    "Strikethrough": "strikethrough",
    "FencedCode": "codeblock",
    "CodeBlock": "codeblock",
    "Blockquote": "blockquote",
    "BulletList": "ul",
    "OrderedList": "ol",
    "ATXHeading1": "h1",
    "ATXHeading2": "h2",
    "ATXHeading3": "h3",
    "ATXHeading4": "h4",
    "ATXHeading5": "h5",
    "ATXHeading6": "h6",
  }

  public actives: string[] = []
  public element: HTMLDivElement

  constructor(editor: MarkMirror, menus: string[]) {
    this.element = document.createElement('div')
    this.element.classList.add("mm-menubar")
    menus.forEach(name => {
      if (name === "|") {
        const divider = document.createElement("span")
        divider.className = "divider"
        this.element.appendChild(divider)
      } else {
        const button = document.createElement("button")
        const icon = document.createElement("i")
        icon.className = "icon-" + name
        button.setAttribute("data-menu", name)
        button.setAttribute("type", "button")
        button.appendChild(icon)
        button.addEventListener("click", (e) => {
          e.preventDefault()
          const fn: StateCommand = this.actionMap[name]
          if (fn && editor.view) {
            editor.view.focus()
            fn(editor.view)
          }
        })
        this.element.append(button)
      }
    })
  }

  updateDOM () {
    this.element.querySelectorAll("button").forEach(button => {
      const menu: string = button.getAttribute("data-menu") || ""
      if (this.actives.indexOf(menu) !== -1) {
        button.classList.add("active")
      } else {
        button.classList.remove("active")
      }
    })
  }
}

export function updateMenubar (menubar: Menubar) {
  return onSelectionSet(nodes => {
    menubar.actives = nodes.map(node => menubar.typeMap[node.name] || "").filter(Boolean)
    menubar.updateDOM()
  })
}
