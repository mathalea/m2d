import { Polygon } from '../elements/lines/Polygon'
import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newPolygon (points: Point[]) {
  const figure = points[0]?.parentFigure
  for (const e of points) {
    if (figure.selectedElements[0] === e) {
      const points = figure.selectedElements as Point[]
      const p = new Polygon(...points)
      if (figure.pointerSetOptions.color) p.color = figure.pointerSetOptions.color
      if (figure.pointerSetOptions.thickness) p.thickness = figure.pointerSetOptions.thickness
      if (figure.pointerSetOptions.dashed !== undefined) p.dashed = figure.pointerSetOptions.dashed
      figure.selectedElements = []
      figure.displayMessage('')
      p.addSegments()
      return p
    } else {
      e.select()
      figure.displayMessage('Cliquer sur autre point ou sur le premier sommet pour terminer')
    }
  }
}

export function actionNewPolygonMessage (figure: Figure) {
  if ([...figure.set].filter(element => element instanceof Point).length < 2) {
    figure.displayMessage('Il faut au moins trois points pour tracer un polygone')
  } else figure.displayMessage('Cliquer sur le premier sommet du polygone')
}
