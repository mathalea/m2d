import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newPoint (figure: Figure, pointerX: number, pointerY:number) {
  const A = new Point(figure, pointerX, pointerY)
  return A
}
