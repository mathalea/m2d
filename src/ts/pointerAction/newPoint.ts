import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function handleAction (figure: Figure) {
  figure.svg.addEventListener('pointerdown', (event) => {
    if (figure.pointerAction !== 'newPoint') return
    const [pointerX, pointerY] = figure.getPointerCoord(event)
    const A = new Point(figure, pointerX, pointerY)
    figure.set.add(A)
  })
}
