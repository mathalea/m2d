import { Line } from '../elements/lines/Line'
import { LinePerpendicularByPoint } from '../elements/lines/LinePerpendicularlByPoint'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function actionNewPerpendicular (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15 && figure.selectedElements.filter(element => element instanceof Point).length === 0) {
      figure.selectedElements.push(e)
      figure.message('Cliquer sur une droite')
      break
    }
    if (e instanceof Line && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15 && figure.selectedElements.filter(element => element instanceof Line).length === 0) {
      figure.selectedElements.push(e)
      figure.message('Cliquer sur un point')
      break
    }
  }
  if (figure.selectedElements.length === 2) {
    figure.message('Cliquer sur une droite et sur un point')
    const A = figure.selectedElements.filter(element => element instanceof Point)[0] as Point
    const L = figure.selectedElements.filter(element => element instanceof Line)[0] as Line
    const d = new LinePerpendicularByPoint(L, A)
    figure.set.add(d)
    figure.selectedElements = []
  }
}
