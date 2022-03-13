import { AngleBisector } from '../elements/lines/AngleBisector'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newAngleBissector (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 0) {
        e.select()
        figure.displayMessage('Cliquer sur le sommet de l\'angle')
      } else if (figure.selectedElements.length === 1) {
        e.select()
        figure.displayMessage('Cliquer sur un point du 2e côté')
      } else {
        const A = figure.selectedElements[0] as Point
        const O = figure.selectedElements[1] as Point
        const B = e
        const angleBissector = new AngleBisector(A, O, B, figure.pointerSetOptions)
        figure.set.add(angleBissector)
        figure.clearSelectedElements()
        actionNewAngleBissectorMessage(figure)
      }
    }
  }
}

export function actionNewAngleBissectorMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 3) {
    figure.displayMessage('Il faut au moins trois points pour tracer une bissectrice')
  } else figure.displayMessage('Cliquer sur un point du 1er côté')
}
