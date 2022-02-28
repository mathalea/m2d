import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function handleAction (figure: Figure, pointerX: number, pointerY:number) {
  const A = new Point(figure, pointerX, pointerY)
  figure.set.add(A)
}
