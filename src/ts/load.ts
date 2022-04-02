import { Element2D } from './elements/Element2D'
import { Circle } from './elements/lines/Circle'
import { Line } from './elements/lines/Line'
import { Segment } from './elements/lines/Segment'
import { Measure } from './elements/measures/Measure'
import { Point } from './elements/points/Point'
import { Figure, Save } from './Figure'

export function loadJson (save: Save, figure: Figure) {
  const elements: Element2D[] = []
  const exIds: {[id:string]: Element2D} = {}
  for (const e in save) {
    if (save[e].className === 'Point') {
      const x = save[e].arguments[0] as number
      const y = save[e].arguments[1] as number
      const A = new Point(figure, x, y)
      elements.push(A)
      exIds[e] = A
    }
    if (save[e].className === 'Segment') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const A = exIds[id1] as Point
      const B = exIds[id2] as Point
      const s = new Segment(A, B)
      elements.push(s)
    }
    if (save[e].className === 'Line') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const A = exIds[id1] as Point
      const B = exIds[id2] as Point
      const s = new Line(A, B)
      elements.push(s)
    }
    if (save[e].className === 'CircleCenterRadius') {
      const id = save[e].arguments[0] as number
      const radius = save[e].arguments[1] as number
      const center = exIds[id] as Point
      const c = new Circle(center, radius)
      elements.push(c)
    }
    if (save[e].className === 'CircleCenterPointOrMeasure') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const O = exIds[id1] as Point
      const M = exIds[id2] as Point | Measure
      const c = new Circle(O, M)
      elements.push(c)
    }
  }
  return elements
}
