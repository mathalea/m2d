import { Line } from '../elements/lines/Line'
import { Point } from '../elements/points/Point'
import { PointByRotation } from '../elements/points/PointByRotation'
import { Figure } from '../Figure'

export function newRotation (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if ((e instanceof Line || e instanceof Point) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 0 && e instanceof Point) {
        e.select()
        const event = new Event('waitForAngle')
        window.dispatchEvent(event)
        window.addEventListener('angleIsSet', (e: CustomEvent) => {
          figure.pointerSetOptions.angle = e.detail
          figure.displayMessage('Cliquer sur l\'objet à transformer')
        }, { once: true })
      } else {
        const A = figure.selectedElements[0] as Point
        let B = null
        const r = figure.pointerSetOptions.angle
        if (r) {
          if (e instanceof Line) {
            B = e.rotation(A, r)
            if (figure.pointerSetOptions.color) B.color = figure.pointerSetOptions.color
            if (figure.pointerSetOptions.thickness) B.thickness = figure.pointerSetOptions.thickness
            if (figure.pointerSetOptions.dashed !== undefined) B.dashed = figure.pointerSetOptions.dashed
          } else {
            B = new PointByRotation(e, A, r)
          }
          figure.clearSelectedElements()
          A.select()
          return B
        }
      }
    }
  }
}

export function actionNewRotationMessage (figure: Figure) {
  figure.displayMessage('Cliquer sur le centre de la rotation')
}
