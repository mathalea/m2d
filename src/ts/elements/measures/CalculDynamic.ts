import { Measure } from './Measure'
/**
 * Exemple : new CalculDynamic(a => a[0].value / 2, [angle]) // Donnera la moitié de angle
 * Exemple : new CalculDynamic(a => a[0].value + a[1].value, [angle1, angle2]) // Donnera la somme des valeurs des angles
 */
export class CalculDynamic extends Measure {
    calcul: Function
    args: Measure[]
    constructor (calcul: Function, args: Measure[]) {
      super(args[0].parentFigure)
      this.value = calcul(args)
      this.calcul = calcul
      this.args = args
      for (const arg of args) {
        arg.addDependency(this)
      }
    }

    update () {
      this.value = this.calcul(this.args)
      this.notifyAllDependencies()
    }
}
