import { Circle } from '../elements/lines/Circle'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newCirclePoint (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 1) {
        const O = figure.selectedElements[0] as Point
        const c = new Circle(O, e)
        figure.set.add(c)
        figure.clearSelectedElements()
        actionNewCirclePointMessage(figure)
      } else {
        e.select()
        figure.displayMessage('Cliquer sur un point du cercle')
      }
    }
  }
}

export function actionNewCirclePointMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 2) {
    figure.displayMessage('Il faut au moins deux points pour tracer un cercle "centre-point"')
  } else figure.displayMessage('Cliquer sur le centre du cercle')
}
