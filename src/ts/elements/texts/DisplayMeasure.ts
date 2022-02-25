import { Measure } from '../measures/Measure'
import { TextByPosition } from './TextByPosition'

export class DisplayMeasure extends TextByPosition {
    measure: Measure
    textBefore: string
  textAfter: string
  precision: number
  constructor (x: number, y: number, measure: Measure, { precision = 1, textBefore = '', textAfter = '', anchor = 'start' }: {precision?: number, textBefore?: string, textAfter?: string, anchor?: 'start' | 'middle' | 'end' } = {}) {
    super(measure.parentFigure, x, y, textBefore + measure.value.toString().replace(/\d+\.\d+/g, (number: string) => (Math.round(10 ** precision * parseFloat(number)) / 10 ** precision).toString()) + textAfter)
    measure.addDependency(this)
    this.anchor = anchor
    this.measure = measure
    this.textBefore = textBefore
    this.textAfter = textAfter
    this.precision = precision
  }

  update (): void {
    this.text = this.textBefore + this.measure.value.toString().replace(/\d+\.\d+/g, (number: string) => (Math.round(10 ** this.precision * parseFloat(number)) / 10 ** this.precision).toString()) + this.textAfter
    this.notifyAllDependencies() // Utile ?
  }
}
