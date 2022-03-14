import { Circle } from '../elements/lines/Circle'
import { Line } from '../elements/lines/Line'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function hide (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if ((e instanceof Point || e instanceof Line || e instanceof Circle) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      e.hide()
      break
    }
  }
}

export function actionHideMessage (figure: Figure) {
  figure.displayMessage('Cliquer sur l\'objet à masquer')
}
