import { Point } from '../elements/points/Point'
import { Figure } from '../Figure'

export function newPointByCoords (figure: Figure) {
  const event = new Event('waitForCoords')
  window.dispatchEvent(event)
  window.addEventListener('coordsAreSet', (e: CustomEvent) => {
    const x = e.detail.x
    const y = e.detail.y
    if (x !== undefined && y !== undefined) {
      const A = new Point(figure, e.detail.x, y)
      return A
    }
  }, { once: true })
}
