import { Line } from './Line'
import { LineByPointVector } from './LineByPointVector'
import { Point } from '../points/Point'
import { Vector } from '../others/Vector'

export class LinePerpendicularByPoint extends LineByPointVector {
  line : Line // La droite à laquelle il faut être perpendiculaire
  A: Point // Le point par lequel passe la droite
  constructor (L: Line, A: Point, { color = 'black', thickness = 1, temp = false }: {color?: string, thickness?: number, add1?: number, add2?: number, temp?: boolean} = {}) {
    const v = new Vector(L.parentFigure, L.normal.x, L.normal.y)
    super(A, v, { color, thickness, temp })
    this.line = L
    L.addDependency(this)
    A.addDependency(this)
  }

  update (): void {
    // ToFix on pourrait utiliser les bords de la figure plutôt qu'arbitrairement ce 50
    this.moveEnd(this.A.x - 50 * this.line.normal.x, this.A.y - 50 * this.line.normal.y, 1)
    this.moveEnd(this.A.x + 50 * this.line.normal.x, this.A.y + 50 * this.line.normal.y, 2)
  }
}
