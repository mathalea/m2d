import { distance, randint } from '../calculus/random'
import { Circle } from '../elements/Circle'
import { Point } from '../elements/Point'
import { Segment } from '../elements/Segment'

/**
   *
   * @param A Origine
   * @param B Extrémité
   * @param l Distance à laquelle placer le point par rapport à l'origine et dans la direction inverse à celle de B
   * La distance est dans l'unité du repère mais lorsque les points sont déplacés seul le ratio est conservé et non la distance
   * @returns Point
   */
export function pointOnSegment (A: Point, B: Point, l?: number, { style = A.style, color = 'black', thickness = A.thickness } = {}) {
  // ToFix le rapport de l'homothétie est fixe alors que l'on voulait une distance fixe
  const k = (l === undefined) ? (randint(15, 85) / 100) : l / distance(A, B)
  if (distance(A, B)) {
    const s = new Segment(A, B, { temp: true })
    return B.homothetie(A, k, { style, color, thickness, dragable: s })
  }
}

/**
   *
   * @param A Origine
   * @param B Extrémité
   * @param l Distance à laquelle placer le point par rapport à l'origine et dans la direction inverse à celle de B
   * La distance est dans l'unité du repère mais lorsque les points sont déplacés seul le ratio est conservé et non la distance
   * @returns Point
   */
export function pointOnLine (A: Point, B: Point, l?: number, { style = A.style, color = 'black', thickness = A.thickness } = {}) {
  // ToFix le rapport de l'homothétie est fixe alors que l'on voulait une distance fixe
  const k = (l === undefined) ? (randint(15, 85) / 100) : l / distance(A, B)
  if (distance(A, B)) {
    const M = pointOnSegment(A, B, -100)
    const N = pointOnSegment(B, A, -100)
    const l = new Segment(M, N, { temp: true })
    return B.homothetie(A, k, { style, color, thickness, dragable: l })
  }
}

export function pointOnCircle (C: Circle, angle?: number) {
  if (angle === undefined) angle = randint(-180, 180)
  // const angleRadian = angle * Math.PI / 180
  // const x = C.O.x + C.radius * Math.cos(angleRadian)
  // const y = C.O.y + C.radius * Math.sin(angleRadian)
  // const M = new Point(C.parentFigure, x, y)
  // C.addDependency({ element: M, type: 'pointOnCircle', angle })
  const O = C.center
  const M = C.M
  const A = M.rotation(O, angle)
  C.addDependency({ element: A, type: 'pointOnCircle' })
  A.dragable = C
  return A
}
