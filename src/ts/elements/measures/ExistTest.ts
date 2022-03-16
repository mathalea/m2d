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
 *Test d'existance ou de non existance.
 * Sa propriété value vaut 1 ou 0.
 * Si not===false, alors value=1 si l'objet 'element' a sa propriété exist à true et 0 sinon.
 * Si not===false, alors value=0 si l'objet 'element' a sa propriété exist à true et 1 sinon.
 * Exemple d'usage : comme rapport d'homothétie pour faire apparaitre ou disparaitre un segment ou un cercle.
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

    set exist (etat) {
      // On ne change pas l'état
    }

    get exist () {
      return true
    }
}
