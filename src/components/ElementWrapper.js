import Component from './Component';

import { RENDER_TO_DOM } from '../constants';

import replaceContent from '../utils/replace-content';

export default class ElementWrapper extends Component {
  constructor(type) {
    super(type)
    this.type = type
  }

  // setAttribute(name, value) {
  //   if (name.match(/^on([\s\S]+)$/)) {
  //     this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value)
  //   } else {
  //     if (name === 'className') {
  //       this.root.setAttribute('class', value)
  //     } else {
  //       this.root.setAttribute(name, value)
  //     }
  //   }
  // }
  //
  // appendChild(component) {
  //   let range = document.createRange()
  //   range.setStart(this.root, this.root.childNodes.length)
  //   range.setEnd(this.root, this.root.childNodes.length)
  //   component[RENDER_TO_DOM](range)
  // }

  get vdom() {
    this.vchildren = this.children.map(child => child.vdom)
    return this
  }

  [RENDER_TO_DOM](range) {
    this._range = range
    let root = document.createElement(this.type)

    for (let name in this.props) {
      let value = this.props[name]
      if (name.match(/^on([\s\S]+)$/)) {
        root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value)
      } else {
        if (name === 'className') {
          root.setAttribute('class', value)
        } else {
          root.setAttribute(name, value)
        }
      }
    }

    if (!this.vchildren) {
      this.vchildren = this.children.map(child => child.vdom)
    }

    for (let child of this.vchildren) {
      let childRange = document.createRange()
      childRange.setStart(root, root.childNodes.length)
      childRange.setEnd(root, root.childNodes.length)
      child[RENDER_TO_DOM](childRange)
    }

    replaceContent(range, root)
  }
}

