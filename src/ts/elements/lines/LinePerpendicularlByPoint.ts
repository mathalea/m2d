import { Line, OptionsGraphiques } from './Line'
import { LineByPointVector } from './LineByPointVector'
import { Point } from '../points/Point'
import { VectorNormal } from '../others/VectorNormal'

export class LinePerpendicularByPoint extends LineByPointVector {
  line: Line // La droite à laquelle il faut être perpendiculaire
  A: Point // Le point par lequel passe la droite
  constructor (L: Line, A: Point, { color = 'black', thickness = 1, temp = false }: OptionsGraphiques = {}) {
    const v = new VectorNormal(L)
    super(A, v, { color, thickness, temp })
    this.line = L
  }
}
