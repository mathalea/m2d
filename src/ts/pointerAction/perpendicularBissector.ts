import { PerpendicularBisector } from '../elements/lines/PerpendicularBisector'
import { Segment } from '../elements/lines/Segment'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newPerpendicularBissector (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 1) {
        const A = figure.selectedElements[0] as Point
        const s = new Segment(A, e, { temp: true })
        const perpendicularBissector = new PerpendicularBisector(s)
        figure.set.add(perpendicularBissector)
        figure.clearSelectedElements()
        actionNewPerpendicularBissectorMessage(figure)
      } else {
        e.select()
        figure.displayMessage('Cliquer sur l\'autre extrémité')
      }
    }
  }
}

export function actionNewPerpendicularBissectorMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 2) {
    figure.displayMessage('Il faut au moins deux points pour tracer une médiatrice')
  } else figure.displayMessage('Cliquer sur les deux extrémités du segment')
}
