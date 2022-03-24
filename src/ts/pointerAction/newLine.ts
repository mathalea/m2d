import { Line } from '../elements/lines/Line'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newLine (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 1) {
        const A = figure.selectedElements[0] as Point
        const s = new Line(A, e, figure.pointerSetOptions)
        figure.selectedElements = []
        figure.displayMessage('Cliquer sur deux points de la droite')
        return s
      } else {
        figure.selectedElements.push(e)
        figure.displayMessage('Cliquer sur un deuxième point de la droite')
      }
    }
  }
}

export function actionNewLineMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 2) {
    figure.displayMessage('Il faut au moins deux points pour tracer une droite')
  } else figure.displayMessage('Cliquer sur deux points de la droite')
}
