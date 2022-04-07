/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Point, PointOptions } from './Point'
import { Vector } from '../others/Vector'
import { VectorByPoints } from '../others/VectorByPoints'
/**
 * Crée l'image de A par la translation de vecteur v.
 * v est un Vector ou un VectorByPoints
 */
export class PointByTranslationVector extends Point {
  previous: Point
  vector: Vector | VectorByPoints
  constructor (A: Point, v: Vector | VectorByPoints, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false }: PointOptions = {}) {
    console.log(v, v instanceof Vector)
    super(A.parentFigure, A.x + v.x, A.y + v.y, { style, size, thickness, color, draggable, temp })
    this.previous = A
    this.vector = v
    if (label !== undefined) this.label = label
    A.addChild(this)
    v.addChild(this)
  }

  save () {
    super.save()
    this.parentFigure.save[this.id].className = 'PointByTranslationVector'
    this.parentFigure.save[this.id].arguments = [this.previous.id, this.vector.id]
  }

  update (): void {
    try {
      this.moveTo(this.previous.x + this.vector.x, this.previous.y + this.vector.y)
    } catch (error) {
      console.log('Erreur dans PointByTranslationVector.update()', error)
      this.exist = false
    }

    this.notifyAllChilds()
  }
}
