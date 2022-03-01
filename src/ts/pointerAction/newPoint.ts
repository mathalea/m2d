import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function actionNewPoint (figure: Figure, pointerX: number, pointerY:number) {
  const A = new Point(figure, pointerX, pointerY)
  figure.set.add(A)
}
