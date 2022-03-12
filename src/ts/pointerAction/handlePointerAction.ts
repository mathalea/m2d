import { Figure } from '../Figure'
import { actionStartDrag as startDrag } from './drag'

import { newPoint } from './newPoint'
import { newSegment, actionNewSegmentMessage } from './newSegment'
import { setOptions } from './setOptions'
import { newPerpendicular, actionNewPerpendicularMessage } from './newPerpendicular'
import { newLine, actionNewLineMessage } from './newLine'
import { actionNewPerpendicularBissectorMessage, newPerpendicularBissector } from './perpendicularBissector'
import { newIntersection } from './newIntersection'
import { actionNewCirclePointMessage, newCirclePoint } from './newCirclePoint'

export function handlePointerAction (figure: Figure, event: PointerEvent) {
  const [pointerX, pointerY] = figure.getPointerCoord(event)
  if (figure.pointerAction === 'freePoint') newPoint(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'drag') startDrag(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'segment') newSegment(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'circlePoint') newCirclePoint(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'perpendicularBissector') newPerpendicularBissector(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'line') newLine(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'perpendicular') newPerpendicular(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'intersectionLL') newIntersection(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'setOptions') setOptions(figure, pointerX, pointerY, figure.pointerSetOptions)
}

export function initMessageAction (figure: Figure, pointerAction: string) {
  console.log(pointerAction)
  if (pointerAction === 'drag') figure.displayMessage('')
  else if (pointerAction === 'freePoint') figure.displayMessage('Cliquer pour créer un nouveau point')
  else if (pointerAction === 'segment') actionNewSegmentMessage(figure)
  else if (pointerAction === 'circlePoint') actionNewCirclePointMessage(figure)
  else if (pointerAction === 'perpendicularBissector') actionNewPerpendicularBissectorMessage(figure)
  else if (pointerAction === 'line') actionNewLineMessage(figure)
  else if (pointerAction === 'droitePerpendiculaire') actionNewPerpendicularMessage(figure)
  else if (pointerAction === 'intersectionLL') figure.displayMessage('Cliquer sur l\'élément sur lequel appliquer le nouveau style')
}
