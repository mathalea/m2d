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

export abstract class Measure {
    parentFigure: Figure
    value: number
    childs: (Element2D | Measure)[]
    private _exist: boolean
    constructor (parentFigure: Figure) {
      this.parentFigure = parentFigure
      this.childs = []
      this.value = 0
      this._exist = true
    }

    abstract update ():void

    addChild (child: Element2D | Measure) {
      this.childs.push(child)
    }

    notifyAllChilds () {
      for (const element of this.childs) {
        element.update()
      }
    }

    set exist (b) {
      this._exist = b
      for (const e of this.childs) {
        e.exist = b
      }
    }

    get exist () {
      return this._exist
    }
}
