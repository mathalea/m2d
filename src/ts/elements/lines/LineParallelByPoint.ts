import { Line, OptionsGraphiques } from './Line'
import { LineByPointVector } from './LineByPointVector'
import { Point } from '../points/Point'
import { Vector } from '../others/Vector'

export class LineParallelByPoint extends LineByPointVector {
  line: Line // La droite à laquelle il faut être parallèle
  A: Point // Le point par lequel passe la droite
  constructor(L: Line, A: Point, { color = 'black', thickness = 1 }: OptionsGraphiques = {}) {
    const v = new Vector(L.parentFigure, L.directeur.x, L.directeur.y)
    super(A, v, { color, thickness })
    this.line = L
    L.addDependency(this)
  }

  update(): void {
    // ToFix on pourrait utiliser les bords de la figure plutôt qu'arbitrairement ce 50
  }
}
