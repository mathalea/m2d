import { Figure } from '../Figure'
import { Element2D } from './Element2D'

export class Text extends Element2D {
    private _x: number
    private _y: number
    private _text: string
    alignment: string
    constructor (figure: Figure, x: number, y: number, text: string, { alignment = '', temp = false }: {alignment?: string, temp?: boolean} = {}) {
      super()
      this.parentFigure = figure
      this.alignment = alignment
      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      this.x = x
      this.y = y
      this.text = text
      this.g.setAttribute('stroke', 'black')
      this.g.style.overflow = 'visible'
      this.g.style.lineHeight = '0'
      if (!temp) this.parentFigure.svg.appendChild(this.g)
    }

    get x () {
      return this._x
    }

    set x (x) {
      this.g.setAttribute('x', `${this.parentFigure.xToSx(x)}`)
      this._x = x
    }

    get y () {
      return this._y
    }

    set y (y) {
      this.g.setAttribute('y', `${this.parentFigure.yToSy(y)}`)
      this._y = y
    }

    get text () {
      return this._text
    }

    set text (text) {
      this.g.textContent = `${text}`
      this._text = text
    }

    update (): void {
    }

  // get tex () {

  // }
}
