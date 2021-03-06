/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Line, OptionsGraphiques } from './Line'
import { LineByPointVector } from './LineByPointVector'
import { Point } from '../points/Point'
import { VectorNormal } from '../others/VectorNormal'
/**
 * Crée une droite par la donnée d'une autre droite (perpendiculaire) et d'un point de passage.
 */
export class LinePerpendicularByPoint extends LineByPointVector {
  line: Line // La droite à laquelle il faut être perpendiculaire
  A: Point // Le point par lequel passe la droite
  constructor (L: Line, A: Point, { color = 'black', thickness = 1, dashed = false, temp = false }: OptionsGraphiques = {}) {
    const v = new VectorNormal(L)
    super(A, v, { color, thickness, dashed, temp })
    this.line = L
    this.A = A
    this.exist = A.exist && L.exist
  }
}
