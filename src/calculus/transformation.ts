import { Point } from '../elements/Point'

/**
   *
   * @param A Antécédent
   * @param O Centre
   * @param angle Image
   * @returns [x, y] coordonnées de l'image
   */
export function rotationCoord (A: Point, O: Point, angle: number) {
  const x = (O.x + (A.x - O.x) * Math.cos((angle * Math.PI) / 180) - (A.y - O.y) * Math.sin((angle * Math.PI) / 180))
  const y = (O.y + (A.x - O.x) * Math.sin((angle * Math.PI) / 180) + (A.y - O.y) * Math.cos((angle * Math.PI) / 180))
  return [x, y]
}

/**
   *
   * @param A Antécédent
   * @param O Centre
   * @param k Coefficient
   * @returns [x, y] coordonnées de l'image
   */
export function homothetieCoord (A: Point, O: Point, k: number) {
  const x = (O.x + k * (A.x - O.x))
  const y = (O.y + k * (A.y - O.y))
  return [x, y]
}

/**
   *
   * @param A Antécédent
   * @param O Centre
   * @param k Coefficient
   * @param angle Angle en degrés
   * @returns [x, y] coordonnées de l'image
   */
export function similitudeCoord (A: Point, O: Point, k: number, angle: number) {
  const angleRadian = angle * Math.PI / 180
  const x = (O.x + k * (Math.cos(angleRadian) * (this.x - O.x) - Math.sin(angleRadian) * (this.y - O.y)))
  const y = (O.y + k * (Math.cos(angleRadian) * (this.y - O.y) + Math.sin(angleRadian) * (this.x - O.x)))
  return [x, y]
}
