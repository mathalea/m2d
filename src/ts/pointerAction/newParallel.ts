import { Line } from '../elements/lines/Line'
import { LineParallelByPoint } from '../elements/lines/LineParallelByPoint'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newParallel (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15 && figure.selectedElements.filter(element => element instanceof Point).length === 0) {
      e.select()
      figure.displayMessage('Cliquer sur une droite')
      break
    }
    if (e instanceof Line && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15 && figure.selectedElements.filter(element => element instanceof Line).length === 0) {
      e.select()
      figure.displayMessage('Cliquer sur un point')
      break
    }
  }
  if (figure.selectedElements.length === 2) {
    figure.displayMessage('Cliquer sur une droite et sur un point')
    const A = figure.selectedElements.filter(element => element instanceof Point)[0] as Point
    const L = figure.selectedElements.filter(element => element instanceof Line)[0] as Line
    const d = new LineParallelByPoint(L, A, figure.pointerSetOptions)
    figure.clearSelectedElements()
    return d
  }
}

export function actionNewParallelMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Line).length < 1) {
    figure.displayMessage('Il faut au moins une droite et un point pour tracer une droite parallèle')
  } else figure.displayMessage('Cliquer sur une droite et sur un point')
}
