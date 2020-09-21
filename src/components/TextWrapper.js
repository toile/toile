import { RENDER_TO_DOM } from '../constants';

import replaceContent from '../utils/replace-content';

export default class TextWrapper extends Component {
  constructor(content) {
    super(content)
    this.type = '#text'
    this.content = content
  }

  get vdom() {
    return this
  }

  [RENDER_TO_DOM](range) {
    this._range = range
    let root = document.createTextNode(this.content)
    replaceContent(range, root)
  }
}
