import { Measure } from '../measures/Measure'
import { TextByPosition } from './TextByPosition'

export class DisplayMeasure extends TextByPosition {
    measure: Measure
    textBefore: string
    textAfter: string
    constructor (x: number, y: number, measure: Measure, { textBefore = '', textAfter = '' }: {textBefore?: string, textAfter?: string} = {}) {
      super(measure.parentFigure, x, y, textBefore + measure.value.toString().replace(/\d+\.\d+/g, (number: string) => (Math.round(10 * parseFloat(number)) / 10).toString()) + textAfter)
      measure.addDependency(this)
      this.measure = measure
      this.textBefore = textBefore
      this.textAfter = textAfter
    }

    update (): void {
      this.text = this.textBefore + this.measure.value.toString().replace(/\d+\.\d+/g, (number: string) => (Math.round(10 * parseFloat(number)) / 10).toString()) + this.textAfter
      this.notifyAllDependencies() // Utile ?
    }
}
