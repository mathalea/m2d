/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from '../../Figure'
import { Element2D } from '../Element2D'
import { Measure } from './Measure'
/**
 *
 */
export class ExistTest extends Measure {
    element: Element2D
    not: boolean
    constructor (figure: Figure, element:Element2D, not: boolean = false) {
      super(figure)
      this.element = element
      this.not = not
      if (not) this.value = element.exist ? 0 : 1
      else this.value = element.exist ? 1 : 0
      element.addChild(this)
    }

    update () {
      if (this.not) this.value = this.element.exist ? 0 : 1
      else this.value = this.element.exist ? 1 : 0
      this.notifyAllChilds()
    }
}
