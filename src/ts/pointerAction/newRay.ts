import { Ray } from '../elements/lines/Ray'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newRay (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 1) {
        const A = figure.selectedElements[0] as Point
        if (e === A) break
        const s = new Ray(A, e, figure.pointerSetOptions)
        figure.selectedElements = []
        actionNewRayMessage(figure)
        return s
      } else {
        e.select()
        figure.displayMessage('Cliquer sur un point de la demi-droite')
      }
    }
  }
}

export function actionNewRayMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 2) {
    figure.displayMessage('Il faut au moins deux points pour tracer une demi-droite')
  } else figure.displayMessage('Cliquer sur l\'origine de la demi-droite')
}
