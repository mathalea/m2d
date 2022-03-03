import { Segment } from '../elements/lines/Segment'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function actionNewSegment (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.setSelectedElements.size === 1) {
        const A = [...figure.setSelectedElements][0] as Point
        const s = new Segment(A, e)
        figure.set.add(s)
        figure.setSelectedElements.clear()
      } else figure.setSelectedElements.add(e)
    }
  }
}
