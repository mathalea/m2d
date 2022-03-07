import { Line } from '../elements/lines/Line'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function actionNewLine (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.setSelectedElements.size === 1) {
        const A = [...figure.setSelectedElements][0] as Point
        const s = new Line(A, e)
        figure.set.add(s)
        figure.setSelectedElements.clear()
        figure.message('Cliquer sur deux points de la droite')
      } else {
        figure.setSelectedElements.add(e)
        figure.message('Cliquer sur un deuxième point de la droite')
      }
    }
  }
}
