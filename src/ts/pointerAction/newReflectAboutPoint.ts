import { Circle } from '../elements/lines/Circle'
import { Line } from '../elements/lines/Line'
import { Point } from '../elements/points/Point'
import { PointByRotation } from '../elements/points/PointByRotation'
import { Figure } from '../Figure'

export function newReflectAboutPoint (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if ((e instanceof Line || e instanceof Circle || e instanceof Point) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      if (figure.selectedElements.length === 1) {
        const A = figure.selectedElements[0] as Point
        let B = null
        if (e instanceof Line || e instanceof Circle) {
          B = e.rotation(A, 180)
          if (B && figure.pointerSetOptions.color) B.color = figure.pointerSetOptions.color
          if (B && figure.pointerSetOptions.thickness) B.thickness = figure.pointerSetOptions.thickness
          if (B && figure.pointerSetOptions.dashed !== undefined) B.dashed = figure.pointerSetOptions.dashed
        } else {
          B = new PointByRotation(e, A, 180)
        }
        figure.clearSelectedElements()
        A.select()
        return B
      } else if (e instanceof Point) {
        e.select()
        figure.displayMessage('Cliquer sur l\'objet à transformer')
      }
    }
  }
}

export function actionNewReflectAboutPointMessage (figure: Figure) {
  figure.displayMessage('Cliquer sur le centre de la symétrie centrale')
}
