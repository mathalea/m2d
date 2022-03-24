import { Figure } from '../Figure'
import { actionStartDrag as startDrag } from './drag'

import { newPoint } from './newPoint'
import { newSegment, actionNewSegmentMessage } from './newSegment'
import { setOptions } from './setOptions'
import { newPerpendicular, actionNewPerpendicularMessage } from './newPerpendicular'
import { newLine, actionNewLineMessage } from './newLine'
import { actionNewPerpendicularBissectorMessage, newPerpendicularBissector } from './newPerpendicularBissector'
import { actionNewAngleBissectorMessage, newAngleBissector } from './newAngleBissector'
import { newIntersection } from './newIntersection'
import { actionNewCirclePointMessage, newCirclePoint } from './newCirclePoint'
import { actionNewPolygonMessage, newPolygon } from './newPolygon'
import { actionNewCircleRadiusMessage, newCircleRadius } from './newCircleRadius'
import { actionErasetMessage, erase } from './erase'
import { actionNewRayMessage, newRay } from './newRay'
import { actionNewVectorMessage, newVector } from './newVector'
import { actionNewParallelMessage, newParallel } from './newParallel'
import { actionHideMessage, hide } from './hide'
import { newPointByCoords } from './newPointByCoords'
import { newReflectAboutPoint, actionNewReflectAboutPointMessage } from './newReflectAboutPoint'
import { newRotation, actionNewRotationMessage } from './newRotation'

export function handlePointerAction (figure: Figure, event: PointerEvent) {
  const [pointerX, pointerY] = figure.getPointerCoord(event)
  if (figure.pointerAction === 'freePoint') newPoint(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'pointByCoords') newPointByCoords(figure)
  else if (figure.pointerAction === 'drag') startDrag(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'erase') erase(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'hide') hide(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'segment') newSegment(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'line') newLine(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'ray') newRay(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'vector') newVector(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'circlePoint') newCirclePoint(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'circleRadius') newCircleRadius(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'perpendicularBissector') newPerpendicularBissector(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'angleBissector') newAngleBissector(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'perpendicular') newPerpendicular(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'parallel') newParallel(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'intersectionLL') newIntersection(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'polygon') newPolygon(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'reflectAboutPoint') newReflectAboutPoint(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'rotation') newRotation(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'setOptions') setOptions(figure, pointerX, pointerY, figure.pointerSetOptions)
}

export function initMessageAction (figure: Figure, pointerAction: string) {
  if (pointerAction === 'drag') figure.displayMessage('')
  else if (pointerAction === 'erase') actionErasetMessage(figure)
  else if (pointerAction === 'hide') actionHideMessage(figure)
  else if (pointerAction === 'freePoint') figure.displayMessage('Cliquer pour créer un nouveau point')
  else if (pointerAction === 'segment') actionNewSegmentMessage(figure)
  else if (pointerAction === 'circlePoint') actionNewCirclePointMessage(figure)
  else if (pointerAction === 'circleRadius') actionNewCircleRadiusMessage(figure)
  else if (pointerAction === 'perpendicularBissector') actionNewPerpendicularBissectorMessage(figure)
  else if (pointerAction === 'angleBissector') actionNewAngleBissectorMessage(figure)
  else if (pointerAction === 'line') actionNewLineMessage(figure)
  else if (pointerAction === 'ray') actionNewRayMessage(figure)
  else if (pointerAction === 'vector') actionNewVectorMessage(figure)
  else if (pointerAction === 'perpendicular') actionNewPerpendicularMessage(figure)
  else if (pointerAction === 'parallel') actionNewParallelMessage(figure)
  else if (pointerAction === 'intersectionLL') figure.displayMessage('Cliquer sur l\'élément sur lequel appliquer le nouveau style')
  else if (pointerAction === 'polygon') actionNewPolygonMessage(figure)
  else if (pointerAction === 'reflectAboutPoint') actionNewReflectAboutPointMessage(figure)
  else if (pointerAction === 'rotation') actionNewRotationMessage(figure)
}
