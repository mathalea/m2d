/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Measure } from '../measures/Measure'
import { TextByPosition } from './TextByPosition'

export class DisplayMeasure extends TextByPosition {
    measure: Measure
    textBefore: string
  textAfter: string
  precision: number
  constructor (x: number, y: number, measure: Measure, { precision = 1, textBefore = '', textAfter = '', anchor = 'start' }: {precision?: number, textBefore?: string, textAfter?: string, anchor?: 'start' | 'middle' | 'end' } = {}) {
    super(measure.parentFigure, x, y, textBefore + measure.value.toString().replace(/\d+\.\d+/g, (number: string) => (Math.round(10 ** precision * parseFloat(number)) / 10 ** precision).toString()) + textAfter)
    measure.addChild(this)
    this.anchor = anchor
    this.measure = measure
    this.textBefore = textBefore
    this.textAfter = textAfter
    this.precision = precision
  }

  update (): void {
    this.text = this.textBefore + this.measure.value.toString().replace(/\d+\.\d+/g, (number: string) => (Math.round(10 ** this.precision * parseFloat(number)) / 10 ** this.precision).toString()) + this.textAfter
    this.notifyAllChilds() // Utile ?
  }
}
