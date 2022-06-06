import "./css/index.css"
import { MarkMirror, onSelectionSet, markdownActionMap, markdownNodeMenus } from "@markmirror/core"

export class Menubar {
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
        icon.className = "i-menu-" + name
        button.setAttribute("data-menu", name)
        button.setAttribute("type", "button")
        button.appendChild(icon)
        button.addEventListener("click", (e) => {
          e.preventDefault()
          const fn = markdownActionMap[name]
          if (fn && editor.view) {
            editor.view.focus()
            fn(editor.view)
          }
        })
        this.element.append(button)
      }
    })
    editor.addExtension(updateMenubar(this))
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

function updateMenubar (menubar: Menubar) {
  return onSelectionSet(nodes => {
    menubar.actives = nodes.map(node => markdownNodeMenus[node.name] || "").filter(Boolean)
    menubar.updateDOM()
  })
}
