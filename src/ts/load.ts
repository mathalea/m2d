import { Element2D } from './elements/Element2D'
import { Segment } from './elements/lines/Segment'
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
      exIds[save[e].id] = A
    }
    if (save[e].className === 'Segment') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const A = exIds[id1] as Point
      const B = exIds[id2] as Point
      const s = new Segment(A, B)
      elements.push(s)
    }
  }
  return elements
}
