import { Circle } from '../elements/Circle'
import { Segment } from '../elements/Segment'
import { distance } from './random'

/**
 * @param {Droite} d la droite qui intecepte (ou pas le cercle)
 * @param {Cercle} C le cercle
 * @param {string} nom le nom du point d'intersection
 * @param {entier} n 1 pour le premier point, 2 sinon. Si il n'y a qu'un seul point d'intesection, l'un ou l'autre renvoie ce point.
 * @example I = pointItersectionLC(d,c,'I',1) // I est le premier point d'intersection si il existe de la droite (d) et du cercle (c)
 * @author Jean-Claude Lhote
 */
export function intersectionLCCoord (D: Segment, C: Circle, n: 1 | 2 = 1) {
  const O = C.center
  const r = C.radius
  const [a, b, c] = D.equation
  const xO = O.x
  const yO = O.y
  let Delta: number, delta: number, xi: number, yi: number, xiPrime: number, yiPrime: number
  if (b === 0) {
    // la droite est verticale
    xi = -c / a
    xiPrime = xi
    Delta = 4 * (-xO * xO - (c * c) / (a * a) - (2 * xO * c) / a + r * r)
    if (Delta < 0) return [undefined, undefined]
    else if (Math.abs(Delta) < 10 ** (-6)) {
      // un seul point d'intersection
      yi = yO + Math.sqrt(Delta) / 2
      yiPrime = yi
    } else {
      // deux points d'intersection
      yi = yO - Math.sqrt(Delta) / 2
      yiPrime = yO + Math.sqrt(Delta) / 2
    }
  } else if (a === 0) {
    // la droite est horizontale
    yi = -c / b
    yiPrime = yi
    Delta = 4 * (-yO * yO - (c * c) / (b * b) - (2 * yO * c) / b + r * r)
    if (Delta < 0) return [undefined, undefined]
    else if (Math.abs(Delta) < 10 ** (-6)) {
      // un seul point d'intersection
      xi = xO + Math.sqrt(Delta) / 2
      xiPrime = xi
    } else {
      // deux points d'intersection
      xi = xO - Math.sqrt(Delta) / 2
      xiPrime = xO + Math.sqrt(Delta) / 2
    }
  } else {
    // cas général
    Delta = (2 * ((a * c) / (b * b) + (yO * a) / b - xO)) ** 2 -
        4 *
        (1 + (a / b) ** 2) *
        (xO * xO + yO * yO + (c / b) ** 2 + (2 * yO * c) / b - r * r)
    if (Delta < 0) return [undefined, undefined]
    else if (Math.abs(Delta) < 10 ** (-6)) {
      // un seul point d'intersection
      delta = Math.sqrt(Delta)
      xi = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) /
          (2 * (1 + (a / b) ** 2))
      xiPrime = xi
      yi = (-a * xi - c) / b
      yiPrime = yi
    } else {
      // deux points d'intersection
      delta = Math.sqrt(Delta)
      xi = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) /
          (2 * (1 + (a / b) ** 2))
      xiPrime = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) + delta) /
          (2 * (1 + (a / b) ** 2))
      yi = (-a * xi - c) / b
      yiPrime = (-a * xiPrime - c) / b
    }
  }
  if (n === 1) {
    if (yiPrime > yi) {
      return [xiPrime, yiPrime]
    } else {
      return [xi, yi]
    }
  } else {
    if (yiPrime > yi) {
      return [xi, yi]
    } else {
      return [xiPrime, yiPrime]
    }
  }
}

export function intersectionSCCoord (L: Segment, C: Circle) {
  const [x] = intersectionLCCoord(L, C, 1)
  const [A, B] = L.ends
  if (x !== undefined && distance(A, B) > C.radius) {
    if (x < Math.max(A.x, B.x) && x > Math.min(A.x, B.x)) {
      return intersectionLCCoord(L, C, 1)
    } else {
      return intersectionLCCoord(L, C, 2)
    }
  } else return [undefined, undefined]
}
