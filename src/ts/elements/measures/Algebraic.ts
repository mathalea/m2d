/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Measure } from './Measure'
/**
 * Exemple : new CalculDynamic(a => a[0].value / 2, [angle]) // Donnera la moitié de angle
 * Exemple : new CalculDynamic(a => a[0].value + a[1].value, [angle1, angle2]) // Donnera la somme des valeurs des angles
 */
export class Algebraic extends Measure {
  constructor (svgContainer, val) {
    super(svgContainer)
    this.value = val
  }

  update () {
    this.notifyAllDependencies()
  }
}
