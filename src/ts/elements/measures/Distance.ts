/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { distance } from '../../calculus/random'
import { Point } from '../points/Point'
import { Measure } from './Measure'

export class Distance extends Measure {
    A: Point
    B: Point
    constructor (A: Point, B: Point) {
      super(A.parentFigure)
      this.dependencies = []
      this.A = A
      this.B = B
      A.addDependency(this)
      B.addDependency(this)
      this.update()
    }

    update () {
      this.value = distance(this.A, this.B)
      this.notifyAllDependencies()
    }
}
