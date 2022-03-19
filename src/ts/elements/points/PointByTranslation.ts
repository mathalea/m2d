/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Point, PointOptions } from './Point'
/**
 * Crée l'image (Point) de A par la translation de vecteur(xt;yt).
 * xt et yt sont des nombres (constantes). ToFix : pourquoi ne pas ajouter les instances de classes dérivées de Measure ?
 */
export class PointByTranslation extends Point {
    xt: number
    yt: number
    previous: Point
    constructor (A: Point, xt: number, yt: number, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
      super(A.parentFigure, A.x + xt, A.y + yt, { style, size, thickness, color, draggable, temp })
      this.xt = xt
      this.yt = yt
      this.previous = A
      if (label !== undefined) this.label = label
      A.addChild(this)
    }

    update (): void {
      try {
        this.moveTo(this.previous.x + this.xt, this.previous.y + this.yt)
      } catch (error) {
        console.log('Erreur dans PointByTranslation.update()', error)
        this.exist = false
      }
    }
}
