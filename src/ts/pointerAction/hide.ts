import { Circle } from '../elements/lines/Circle'
import { Line } from '../elements/lines/Line'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function hide (figure: Figure, pointerX: number, pointerY: number) {
  const points = [...figure.set].filter((elt) => { return elt instanceof Point })
  const linesAndCircles = [...figure.set].filter((elt) => { return (elt instanceof Line || elt instanceof Circle) })
  for (const e of points) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      e.hide()
      e.draggable = false
      return e
    }
  }
  for (const e of linesAndCircles) {
    if ((e instanceof Line || e instanceof Circle) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      e.hide()
      return e
    }
  }
}

export function actionHideMessage (figure: Figure) {
  figure.displayMessage('Cliquer sur l\'objet à masquer')
}
