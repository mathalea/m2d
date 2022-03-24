import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newPointByCoords (figure: Figure) {
  const event = new Event('waitForCoords')
  window.dispatchEvent(event)
  window.addEventListener('coordsAreSet', (event: Event) => {
    const detail = (<CustomEvent>event).detail
    const x = detail.x
    const y = detail.y
    if (x !== undefined && y !== undefined) {
      const A = new Point(figure, x, y)
      return A
    }
  }, { once: true })
}
