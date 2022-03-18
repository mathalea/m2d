/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Line, OptionsGraphiques } from './Line'
import { Point } from '../points/Point'
import { PointByTranslationVector } from '../points/PointByTranslationVector'
import { Vector } from '../others/Vector'
/**
 * Crée une droite par la donnée d'un point et d'un vecteur directeur.
 */
export class LineByPointVector extends Line {
  A: Point
  B: Point
  vector: Vector
  constructor (A: Point, v: Vector, { color = 'black', thickness = 1, dashed = false, temp = false }: OptionsGraphiques = {}) {
    const B = new PointByTranslationVector(A, v, { temp: true, draggable: false })
    super(A, B, { lineType: 'Line', color, thickness, dashed, temp })
    this.A = A
    this.B = B
    this.vector = v
    this.exist = v.exist && A.exist
  }
}
