import { Figure } from '../../Figure'
import { Measure } from './Measure'
export class Const extends Measure {
  constructor (figure: Figure, value: number) {
    super(figure)
    this.value = value
  }

  update () {
  }
}
