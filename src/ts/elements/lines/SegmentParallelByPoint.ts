/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { VectorByPoints } from '../others/VectorByPoints'
import { Point } from '../points/Point'
import { PointByTranslationVector } from '../points/PointByTranslationVector'
import { OptionsGraphiques } from './Line'
import { Segment } from './Segment'
/**
 * Crée un segment d'extrémité A et B en appelant le constructeur de Line avec le lineType 'Segment'.
 */
export class SegmentParallelByPoint extends Segment {
  label: string
  constructor (S: Segment, A: Point, { color = 'black', thickness = 1, style = '', temp = false, dashed = false }: OptionsGraphiques = {}) {
    const v = new VectorByPoints(S.A, S.B)
    const B = new PointByTranslationVector(A, v)
    super(A, B, { lineType: 'Segment', color, thickness, style, temp, dashed })
    if (!temp) this.parentFigure.set.add(this)
    this.label = (A.label && B.label) ? `[${A.label}${B.label}]` : ''
    if (!temp) this.parentFigure.svg.appendChild(this.g)

    // Les styles ne doivent être appliqués qu'une fois le groupe créé
    this.color = color
    this.thickness = thickness
    this.style = style
    this.dashed = dashed
    // Les dépendances sont gérées dans Line
  }
}
