import { Figure } from '../Figure'
import { actionStartDrag } from './drag'

import { actionNewPoint } from './newPoint'
import { actionNewSegment, actionNewSegmentMessage } from './newSegment'
import { actionSetOptions } from './setOptions'
import { actionNewPerpendicular, actionNewPerpendicularMessage } from './newPerpendicular'
import { actionNewLine } from './newLine'

export function handlePointerAction (figure: Figure, event: PointerEvent) {
  const [pointerX, pointerY] = figure.getPointerCoord(event)
  if (figure.pointerAction === 'pointLibre') actionNewPoint(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'drag') actionStartDrag(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'segment') actionNewSegment(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'droite') actionNewLine(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'droitePerpendiculaire') actionNewPerpendicular(figure, pointerX, pointerY)
  else if (figure.pointerAction === 'setColor') actionSetOptions(figure, pointerX, pointerY, figure.pointerSetOptions)
}

export function initMessageAction (figure: Figure, pointerAction: string) {
  if (pointerAction === 'drag') figure.displayMessage('')
  else if (pointerAction === 'pointLibre') figure.displayMessage('Cliquer pour créer un nouveau point')
  else if (pointerAction === 'segment') actionNewSegmentMessage(figure)
  else if (pointerAction === 'droitePerpendiculaire') actionNewPerpendicularMessage(figure)
}
