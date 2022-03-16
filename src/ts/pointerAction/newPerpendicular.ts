import { Line } from '../elements/lines/Line'
import { LinePerpendicularByPoint } from '../elements/lines/LinePerpendicularlByPoint'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newPerpendicular (figure: Figure, pointerX: number, pointerY: number) {
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
    const d = new LinePerpendicularByPoint(L, A, figure.pointerSetOptions)
    figure.set.add(d)
    figure.clearSelectedElements()
  }
}

export function actionNewPerpendicularMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Line).length < 1) {
    figure.displayMessage('Il faut au moins une droite et un point pour tracer une droite perpendiculaire')
  } else figure.displayMessage('Cliquer sur une droite et sur un point')
}
