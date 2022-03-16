import { Circle } from '../elements/lines/Circle'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newCircleRadius (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      e.select()
      const O = e as Point
      const event = new Event('waitForRadius')
      window.dispatchEvent(event)
      window.addEventListener('radiusIsSet', (e: CustomEvent) => {
        const r = e.detail || 0
        if (r > 0) {
          const C = new Circle(O, r, figure.pointerSetOptions)
          figure.set.add(C)
        }
        figure.clearSelectedElements()
        figure.displayMessage('Cliquer sur le centre du cercle')
      }, { once: true })
    }
  }
}

export function actionNewCircleRadiusMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 1) {
    figure.displayMessage('Il faut au moins un point pour tracer un cercle')
  } else figure.displayMessage('Cliquer sur le centre du cercle')
}
