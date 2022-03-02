import Sval from 'sval'
import { Line } from '../elements/lines/Line'
import { Segment } from '../elements/lines/Segment'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function initEditor (figure: Figure) {
  figure.set.clear()
  const interpreter = new Sval({ ecmaVer: 10, sandBox: true }) // On créé une instance de l'interpréteur JS
  interpreter.import(Figure)
  interpreter.import(Line)
  interpreter.import(Segment)
  interpreter.import(Point)
  interpreter.import({
    figure: figure,
    Figure: Figure,
    Point: Point,
    Segment: Segment

  })
  return interpreter
}
