import { Figure } from '../../Figure'
import { Measure } from './Measure'
export class Const extends Measure {
  constructor (figure: Figure, value: number) {
    super(figure)
    this.value = value
  }

  save () {
    if (this.childs.length > 0) this.parentFigure.save[this.id] = { className: 'Const', arguments: [this.value] }
  }

  update () {
  }
}
