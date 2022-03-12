import { Circle } from '../elements/lines/Circle'
import { Line, OptionsGraphiques } from '../elements/lines/Line'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function setOptions (figure: Figure, pointerX: number, pointerY:number, options: OptionsGraphiques) {
  for (const e of figure.set) {
    if ((e instanceof Point || e instanceof Line || e instanceof Circle) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (options.color) e.color = options.color
      if (options.thickness) e.thickness = options.thickness
      if (options.dashed !== undefined) e.dashed = options.dashed
      break
    }
  }
}
