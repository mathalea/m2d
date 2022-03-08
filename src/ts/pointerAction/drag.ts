import { Point } from '../elements/points/Point'
import { TextByPosition } from '../elements/texts/TextByPosition'
import { Figure } from '../Figure'

export function moveDrag (figure: Figure, pointerX: number, pointerY: number) {
  if (!figure.isDraging) return
  const body = document.querySelector('body')
  if (body) body.style.cursor = 'move'
  for (const e of figure.setInDrag) {
    e.notifyPointerMove(pointerX, pointerY)
  }
}

export function actionStartDrag (figure: Figure, pointerX: number, pointerY: number) {
  for (const e of figure.set) {
    if (e.draggable && (e instanceof Point || e instanceof TextByPosition) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
      // ToFix est-ce qu'on garde le fait de pouvoir déplacer plusieurs points en même temps
      // Un set de taille 1 est inutile autant avoir un unique élément
      if (figure.setInDrag.size < 1) {
        figure.setInDrag.add(e)
        figure.isDraging = true
      }
    }
  }
}

export function stopDrag (figure: Figure) {
  for (const e of figure.setInDrag) {
    if (e.snapToGrid) {
      const x = Math.round(e.x / figure.dx) * figure.dx
      const y = Math.round(e.y / figure.dy) * figure.dy
      e.notifyPointerMove(x, y)
    }
  }
  figure.isDraging = false
  figure.setInDrag.clear()
  const body = document.querySelector('body')
  if (body) body.style.cursor = 'default'
}
