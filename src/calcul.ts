import { Point } from './elements/Point'

export function distance (A: Point, B: Point):number {
  return Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)
}
