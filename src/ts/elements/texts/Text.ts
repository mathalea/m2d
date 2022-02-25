import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'

export class TextByPosition extends Element2D {
    private _x: number
    private _y: number
    private _text: string
    alignment: string
    constructor (figure: Figure, x: number, y: number, text: string, { alignment = '', temp = false, draggable = true }: {alignment?: string, temp?: boolean, draggable?: boolean} = {}) {
      super()
      this.parentFigure = figure
      this.alignment = alignment
      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      this.x = x
      this.y = y
      this.text = text
      this.draggable = draggable
      this.g.setAttribute('stroke', 'black')
      this.g.style.overflow = 'visible'
      this.g.style.lineHeight = '0'
      this.g.style.dominantBaseline = 'middle'
      this.g.style.textAnchor = 'middle'
      this.g.style.cursor = this.draggable ? 'move' : 'default'
      if (!temp) {
        this.parentFigure.svg.appendChild(this.g)
        this.parentFigure.set.add(this)
      }
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

    get latex () {
      return `\n\t\\draw (${this.x},${this.y}) node[anchor = center] {${this.text}};`
    }

    /**
   * Quand le pointeur se déplace en mode drag, le point va aussi se déplacer
   * @param x coordonnées dans notre repère
   * @param y
   */
    notifyPointerMove (x: number, y: number) {
      this.x = x
      this.y = y
    }

    /**
   * Détermine la distance entre les points et le pointeur pour déterminer lequel va passer en drag
   * @param pointerX
   * @param pointerY
   * @returns distance entre le point et le pointeur
   */
    public distancePointer (pointerX: number, pointerY: number) {
      return Math.sqrt((this.x - pointerX) ** 2 + (this.y - pointerY) ** 2)
    }

  // get latex () {

  // }
}
