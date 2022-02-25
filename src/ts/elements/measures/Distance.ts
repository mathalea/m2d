import { distance } from '../../calculus/random'
import { Figure } from '../../Figure'
import { Point } from '../points/Point'
import { Measure } from './Measure'

export class Distance extends Measure {
    A: Point
    B: Point
    parentFigure: Figure
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
