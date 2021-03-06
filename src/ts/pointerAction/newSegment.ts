import { Segment } from '../elements/lines/Segment'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newSegment (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 1) {
        const A = figure.selectedElements[0] as Point
        if (A === e) break
        const s = new Segment(A, e, figure.pointerSetOptions)
        figure.clearSelectedElements()
        actionNewSegmentMessage(figure)
        return s
      } else {
        e.select()
        figure.displayMessage('Cliquer sur l\'autre extrémité')
      }
    }
  }
}

export function actionNewSegmentMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 2) {
    figure.displayMessage('Il faut au moins deux points pour tracer un segment')
  } else figure.displayMessage('Cliquer sur les deux extrémités du segment')
}
