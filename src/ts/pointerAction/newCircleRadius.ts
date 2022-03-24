import { Circle } from '../elements/lines/Circle'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newCircleRadius (figure: Figure, pointerX: number, pointerY: number) {
  let C: Circle
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      e.select()
      const O = e as Point
      const event = new Event('waitForRadius')
      window.dispatchEvent(event)
      window.addEventListener('radiusIsSet', (event: Event) => {
        const detail = (<CustomEvent>event).detail
        const r = detail || 0
        if (r > 0) {
          C = new Circle(O, r, figure.pointerSetOptions)
        }
        figure.clearSelectedElements()
        figure.displayMessage('Cliquer sur le centre du cercle')
        return C
      }, { once: true })
    }
  }
}

export function actionNewCircleRadiusMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 1) {
    figure.displayMessage('Il faut au moins un point pour tracer un cercle')
  } else figure.displayMessage('Cliquer sur le centre du cercle')
}
