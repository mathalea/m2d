import { MarkAngle } from '../elements/marks/MarkAngle'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newMarkAngle (clickedPoints: Point[]) {
  const figure = clickedPoints[0].parentFigure
  for (const e of clickedPoints) {
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
      const angleBissector = new MarkAngle(A, O, B, figure.pointerSetOptions)
      figure.clearSelectedElements()
      actionNewMarkAngleMessage(figure)
      return angleBissector
    }
  }
}

export function actionNewMarkAngleMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 3) {
    figure.displayMessage('Il faut au moins trois points pour tracer une bissectrice')
  } else figure.displayMessage('Cliquer sur un point du 1er côté')
}
