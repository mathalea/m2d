import { Element2D } from './elements/Element2D'
import { Segment } from './elements/lines/Segment'
import { Point } from './elements/points/Point'
import { Figure, Save } from './Figure'

export function loadJson (save: Save, figure: Figure) {
  const elements: Element2D[] = []
  for (const e of save) {
    if (e.className === 'Point') {
      const x = e.arguments[0] as number
      const y = e.arguments[1] as number
      const A = new Point(figure, x, y)
      elements.push(A)
    }
    if (e.className === 'Segment') {
      const id1 = e.arguments[0] as number
      const id2 = e.arguments[0] as number
      const A = figure.dictionnary[id1] as Point
      const B = figure.dictionnary[id2] as Point
      const s = new Segment(A, B)
      elements.push(s)
    }
  }
}
