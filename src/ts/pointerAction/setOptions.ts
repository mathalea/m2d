import { Line } from '../elements/lines/Line'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function actionSetOptions (figure: Figure, pointerX: number, pointerY:number, options) {
  for (const e of figure.set) {
    if ((e instanceof Point || e instanceof Line) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      for (const key in options) {
        e[key] = options[key]
      }
      // ToFix on applique au premier que l'on trouve et ce n'est pas forcément le plus proche du pointer
      break
    }
  }
}
