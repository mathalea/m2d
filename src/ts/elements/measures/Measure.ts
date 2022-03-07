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
    dependencies: (Element2D | Measure)[]
    constructor (parentFigure: Figure) {
      this.parentFigure = parentFigure
      this.dependencies = []
      this.value = 0
    }

    abstract update ():void

    addDependency (dependency: Element2D | Measure) {
      this.dependencies.push(dependency)
    }

    notifyAllDependencies () {
      for (const element of this.dependencies) {
        element.update()
      }
    }
}
