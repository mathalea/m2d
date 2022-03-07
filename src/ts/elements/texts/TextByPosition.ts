/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'

export class TextByPosition extends Element2D {
    private _x: number
    private _y: number
    private _text: string
    private _anchor: 'start' | 'middle' | 'end'
    constructor (figure: Figure, x: number, y: number, text: string, { anchor = 'middle', temp = false, draggable = true, color = 'black' }: {anchor?: 'start' | 'middle' | 'end', temp?: boolean, draggable?: boolean, color?: string} = {}) {
      super(figure)
      this.anchor = anchor
      this.g = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      // ToFix est-ce bien nécessaire d'initialiser ainsi ces paramètres ?
      this._x = x
      this._y = y
      this._text = ''
      this._anchor = anchor
      this.x = x
      this.y = y
      this.text = text ?? ''
      this.text = text.replace(/\d+\.\d+/g, (number: string) => (Math.round(10 * parseFloat(number)) / 10).toString())
      this.draggable = draggable
      this.g.setAttribute('stroke', 'black')
      this.g.style.overflow = 'visible'
      this.g.style.lineHeight = '0'
      this.g.style.dominantBaseline = 'middle'
      this.g.style.textAnchor = anchor
      this.g.style.cursor = this.draggable ? 'move' : 'default'
      if (!temp) {
        this.parentFigure.svg.appendChild(this.g)
        this.parentFigure.set.add(this)
      }
      this.color = color
    }

    get anchor () {
      return this._anchor
    }

    set anchor (anchor) {
      this._anchor = anchor
      this.g.style.textAnchor = anchor
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
      if (!this.isVisible) return ''
      let anchorLatex: 'east' | 'center' |'west'
      if (this.anchor === 'start') {
        anchorLatex = 'west'
      } else if (this.anchor === 'middle') {
        anchorLatex = 'center'
      } else {
        anchorLatex = 'east'
      }
      return `\n\t\\draw${(this.color !== 'black' && this.color !== undefined) ? `[${this.color}]` : ''} (${this.x},${this.y}) node[anchor = ${anchorLatex}] {${this.text}};`
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
