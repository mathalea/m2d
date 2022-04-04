/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Point } from '../points/Point'
import { Measure } from './Measure'

export class Distance extends Measure {
    A: Point
    B: Point
    constructor (A: Point, B: Point) {
      super(A.parentFigure)
      this.childs = []
      this.A = A
      this.B = B
      A.addChild(this)
      B.addChild(this)
      this.update()
    }

    save () {
      this.parentFigure.save[this.id] = { className: 'Distance', arguments: [this.A.id, this.B.id] }
    }

    update () {
      try {
        this.value = Point.distance(this.A, this.B)
      } catch (error) {
        console.log('Erreur dans Distance.update()', error)
        this.exist = false
      }
      this.notifyAllChilds()
    }
}
