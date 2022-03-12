import { Figure } from '../Figure'
import { actionStartDrag as startDrag } from './drag'

import { newPoint } from './newPoint'
import { newSegment, actionNewSegmentMessage } from './newSegment'
import { setOptions } from './setOptions'
import { newPerpendicular, actionNewPerpendicularMessage } from './newPerpendicular'
import { newLine } from './newLine'
import { newPerpendicularBissector } from './perpendicularBissector'

export function handlePointerAction (figure: Figure, event: PointerEvent) {
  const [pointerX, pointerY] = figure.getPointerCoord(event)
  if (figure.pointerAction === 'freePoint') newPoint(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'drag') startDrag(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'segment') newSegment(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'perpendicularBissector') newPerpendicularBissector(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'line') newLine(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'perpendicular') newPerpendicular(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'setOptions') setOptions(figure, pointerX, pointerY, figure.pointerSetOptions)
}

export function initMessageAction (figure: Figure, pointerAction: string) {
  if (pointerAction === 'drag') figure.displayMessage('')
  else if (pointerAction === 'pointLibre') figure.displayMessage('Cliquer pour créer un nouveau point')
  else if (pointerAction === 'segment') actionNewSegmentMessage(figure)
  else if (pointerAction === 'droitePerpendiculaire') actionNewPerpendicularMessage(figure)
}
