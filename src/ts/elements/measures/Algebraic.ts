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
