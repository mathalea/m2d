/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Middle } from '../points/Middle'
import { LinePerpendicularByPoint } from './LinePerpendicularlByPoint'
import { OptionsGraphiques } from './Line'
import { Segment } from './Segment'

export class PerpendicularBisector extends LinePerpendicularByPoint {
  segment: Segment
  constructor (S: Segment, { color = 'black', thickness = 1, temp = false }: OptionsGraphiques = {}) {
    const M = new Middle(S, { temp: true })
    super(S, M, { color, thickness, temp })
    this.segment = S
    this.exist = S.exist
  }
}
