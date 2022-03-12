import { Circle } from '../elements/lines/Circle'
import { Line } from '../elements/lines/Line'
import { Point } from '../elements/points/Point'
import { PointIntersectionCC } from '../elements/points/PointIntersectionCC'
import { PointIntersectionLC } from '../elements/points/PointIntersectionLC'
import { PointIntersectionLL } from '../elements/points/PointIntersectionLL'
import { Figure } from '../Figure'

export function newIntersection (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if ((e instanceof Line || e instanceof Circle) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 1) {
        if (figure.selectedElements[0] instanceof Line && e instanceof Line) {
          const L = figure.selectedElements[0] as Line
          const p = new PointIntersectionLL(L, e)
          figure.set.add(p)
        } else if (figure.selectedElements[0] instanceof Line && e instanceof Circle) {
          const L = figure.selectedElements[0] as Line
          const p = new PointIntersectionLC(L, e)
          const p2 = new PointIntersectionLC(L, e, 2)
          figure.set.add(p)
          figure.set.add(p2)
        } else if (figure.selectedElements[0] instanceof Circle && e instanceof Line) {
          const C = figure.selectedElements[0] as Circle
          const p = new PointIntersectionLC(e, C)
          const p2 = new PointIntersectionLC(e, C, 2)
          figure.set.add(p)
          figure.set.add(p2)
        } else if (figure.selectedElements[0] instanceof Circle && e instanceof Circle) {
          const C = figure.selectedElements[0] as Circle
          const p = new PointIntersectionCC(e, C)
          const p2 = new PointIntersectionCC(e, C, 2)
          figure.set.add(p)
          figure.set.add(p2)
        }
        figure.clearSelectedElements()
        figure.displayMessage('Cliquer sur le premier objet pour créer un autre point d\'intersection')
      } else {
        e.select()
        figure.displayMessage('Cliquer sur le deuxième objet')
      }
    }
  }
}

export function actionNewIntersection (figure: Figure) {
  if ([...figure.set].filter(element => !(element instanceof Point)).length < 2) {
    figure.displayMessage('Il n\'y a pas assez d\'objets pour définir un point d\'intersection')
  } else figure.displayMessage('Cliquer sur le premier objet')
}
