import { Line, OptionsGraphiques } from './Line'
import { LineByPointVector } from './LineByPointVector'
import { Point } from '../points/Point'
import { Vector } from '../others/Vector'
import { VectorDirector } from '../others/VectorDirector'

export class LineParallelByPoint extends LineByPointVector {
  line: Line // La droite à laquelle il faut être parallèle
  A: Point // Le point par lequel passe la droite
  constructor(L: Line, A: Point, { color = 'black', thickness = 1 }: OptionsGraphiques = {}) {
    const v = new VectorDirector(L)
    super(A, v, { color, thickness })
    this.line = L
    L.addDependency(this)
  }

  update(): void {
    super.update()
  }
}
