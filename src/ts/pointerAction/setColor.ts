import { Line } from '../elements/lines/Line'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function setColor (figure: Figure, pointerX: number, pointerY:number) {
  for (const e of figure.set) {
    if ((e instanceof Point || e instanceof Line) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      e.color = 'red'
      e.thickness = 3
      break
    }
  }
}
