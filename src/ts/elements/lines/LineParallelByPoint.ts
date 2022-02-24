import { Line } from './Line'
import { LineByPointVector } from './LineByPointVector'
import { Point } from '../points/Point'
import { Vector } from '../Vector'

export class LineParallelByPoint extends LineByPointVector {
  line : Line // La droite à laquelle il faut être parallèle
  A: Point // Le point par lequel passe la droite
  constructor (L: Line, A: Point, { color = 'black', thickness = 1 }: {color?: string, thickness?: number, add1?: number, add2?: number} = {}) {
    const v = new Vector(L.parentFigure, L.directeur.x, L.directeur.y)
    super(A, v, { color, thickness })
    this.line = L
    L.addDependency(this)
  }

  update (): void {
    // ToFix on pourrait utiliser les bords de la figure plutôt qu'arbitrairement ce 50
    this.moveEnd(this.A.x - 50 * this.line.directeur.x, this.A.y - 50 * this.line.directeur.y, 1)
    this.moveEnd(this.A.x + 50 * this.line.directeur.x, this.A.y + 50 * this.line.directeur.y, 2)
  }
}
