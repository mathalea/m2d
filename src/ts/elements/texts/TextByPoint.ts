/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Point } from '../points/Point'
import { TextByPosition } from './TextByPosition'

export class TextByPoint extends TextByPosition {
  A: Point
  private _dx: number
  private _dy: number
  constructor (A: Point, text: string, { dx = 0, dy = 0, anchor = 'middle', color = 'black', draggable = true, temp = false }: {dx?:number, dy?: number, anchor?: 'start' | 'middle' | 'end', temp?: boolean, draggable?: boolean, color?: string } = {}) {
    super(A.parentFigure, A.x + dx, A.y + dy, text, { anchor, color, temp, draggable })
    this.A = A
    this._dx = dx
    this._dy = dy
    A.addChild(this)
  }

  /**
   * Quand le pointeur se déplace en mode drag, le point va aussi se déplacer
   * @param x coordonnées dans notre repère
   * @param y
   */
  notifyPointerMove (x: number, y: number) {
    this.x = x
    this.y = y
    this._dx = this.x - this.A.x
    this._dy = this.y - this.A.y
  }

  update (): void {
    try {
      this.x = this.A.x + this._dx
      this.y = this.A.y + this._dy
    } catch (error) {
      console.log('Erreur dans TextByPoint.update()', error)
      this.exist = false
    }
  }

  get dx () {
    return this._dx
  }

  set dx (dx) {
    this._dx = dx
    this.update()
  }

  get dy () {
    return this._dy
  }

  set dy (dy) {
    this._dy = dy
    this.update()
  }
}
