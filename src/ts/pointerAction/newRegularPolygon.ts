import { RegularPolygon } from '../elements/lines/RegularPolygon'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newRegularPolygon (points: Point[]) {
  const figure = points[0].parentFigure
  for (const e of points) {
    if (figure.selectedElements.length === 0) {
      e.select()
      figure.displayMessage('Cliquer sur le 2e sommet')
    } else {
      e.select()
      const A = figure.selectedElements[0] as Point
      const B = figure.selectedElements[1] as Point
      const event = new Event('waitForNumberOfSides')
      window.dispatchEvent(event)
      window.addEventListener('numberOfSidesIsSet', (event: Event) => {
        const detail = (<CustomEvent>event).detail
        const n = detail || 2
        const P = new RegularPolygon(A, B, n, figure.pointerSetOptions)
        figure.clearSelectedElements()
        figure.displayMessage('Cliquer sur le 1er sommet pour créer un autre polygone régulier')
        return P
      }, { once: true })
    }
  }
}

export function actionNewRegularPolygonMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 1) {
    figure.displayMessage('Il faut au moins deux point pour définir le 1er côté d\'un polygone régulier')
  } else figure.displayMessage('Cliquer sur le 1er sommet')
}
