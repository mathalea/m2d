import { Element2D } from './elements/Element2D'
import { Circle } from './elements/lines/Circle'
import { Line } from './elements/lines/Line'
import { Segment } from './elements/lines/Segment'
import { Const } from './elements/measures/Const'
import { Distance } from './elements/measures/Distance'
import { Measure } from './elements/measures/Measure'
import { Point } from './elements/points/Point'
import { Figure, Save } from './Figure'

export function loadJson (save: Save, figure: Figure) {
  const elements: (Element2D | Measure)[] = []
  const exIds: {[id:string]: Element2D | Measure} = {}
  for (const e in save) {
    if (save[e].className === 'Point') {
      const x = save[e].arguments[0] as number
      const y = save[e].arguments[1] as number
      const A = new Point(figure, x, y)
      console.log(x, y)
      elements.push(A)
      exIds[e] = A
    } else if (save[e].className === 'Segment') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const A = exIds[id1] as Point
      const B = exIds[id2] as Point
      const s = new Segment(A, B)
      elements.push(s)
      exIds[e] = s
    } else if (save[e].className === 'Line') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const A = exIds[id1] as Point
      const B = exIds[id2] as Point
      const s = new Line(A, B)
      elements.push(s)
      exIds[e] = s
    } else if (save[e].className === 'Circle') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const arg1 = exIds[id1] as Point
      const arg2 = exIds[id2] as Point | Measure
      const c = new Circle(arg1, arg2)
      elements.push(c)
      exIds[e] = c
    } else if (save[e].className === 'Distance') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const A = exIds[id1] as Point
      const B = exIds[id2] as Point
      const distance = new Distance(A, B)
      elements.push(distance)
      exIds[e] = distance
    } else if (save[e].className === 'Const') {
      const k = save[e].arguments[0] as number
      const c = new Const(figure, k)
      elements.push(c)
      exIds[e] = c
    }
  }
  return elements
}
