import { Point } from '../elements/points/Point'
import { TextByPosition } from '../elements/texts/TextByPosition'

export function handleDrag (figure) {
  figure.svg.addEventListener('pointermove', (event) => {
    if (!figure.isDraging || figure.pointerAction !== 'drag') return
    document.querySelector('body').style.cursor = 'move'
    const [pointerX, pointerY] = figure.getPointerCoord(event)
    for (const e of figure.setInDrag) {
      e.notifyPointerMove(pointerX, pointerY)
    }
  })

  const startDrag = (event: PointerEvent) => {
    const [pointerX, pointerY] = figure.getPointerCoord(event)
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

  const stopDrag = () => {
    figure.isDraging = false
    figure.setInDrag.clear()
    document.querySelector('body').style.cursor = 'default'
  }

  figure.svg.addEventListener('pointerdown', startDrag)
  figure.svg.addEventListener('pointerup', stopDrag)
  // figure.svg.addEventListener('pointerout', stopDrag)
}
