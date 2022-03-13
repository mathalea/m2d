import { VectorByPoints } from '../elements/others/VectorByPoints'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newVector (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 1) {
        const A = figure.selectedElements[0] as Point
        const s = new VectorByPoints(A, e, figure.pointerSetOptions)
        figure.set.add(s)
        figure.selectedElements = []
        actionNewVectorMessage(figure)
      } else {
        figure.selectedElements.push(e)
        figure.displayMessage('Cliquer sur l\'extrémité du vecteur')
      }
    }
  }
}

export function actionNewVectorMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 2) {
    figure.displayMessage('Il faut au moins deux points pour tracer un vecteur')
  } else figure.displayMessage('Cliquer sur l\'origine du vecteur')
}
