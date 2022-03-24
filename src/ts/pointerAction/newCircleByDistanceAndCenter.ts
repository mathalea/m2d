import { Circle } from '../elements/lines/Circle'
import { Distance } from '../elements/measures/Distance'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newCircleByDistanceAndCenter (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 2) {
        const A = figure.selectedElements[0] as Point
        const B = figure.selectedElements[1] as Point
        const r = new Distance(A, B)
        const c = new Circle(e, r, figure.pointerSetOptions)
        figure.clearSelectedElements()
        actionCircleByDistanceAndCenterMessage(figure)
        return c
      } else {
        if (e === figure.selectedElements[0]) break
        e.select()
        if (figure.selectedElements.length === 1) figure.displayMessage('Cliquer sur le deuxième point du rayon')
        else figure.displayMessage('Cliquer sur le centre du cercle')
      }
    }
  }
}

export function actionCircleByDistanceAndCenterMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 2) {
    figure.displayMessage('Il faut au moins deux points pour définir un cercle par son rayon')
  } else figure.displayMessage('Cliquer sur le premier point du rayon')
}
