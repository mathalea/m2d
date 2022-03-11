/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Circle } from '../elements/lines/Circle'
import { Line } from '../elements/lines/Line'
import { Segment } from '../elements/lines/Segment'
import { distance } from './random'

/**
 * @param {Droite} d la droite qui intecepte (ou pas le cercle)
 * @param {Cercle} C le cercle
 * @param {string} nom le nom du point d'intersection
 * @param {entier} n 1 pour le premier point, 2 sinon. Si il n'y a qu'un seul point d'intesection, l'un ou l'autre renvoie ce point.
 * @example I = pointItersectionLC(d,c,'I',1) // I est le premier point d'intersection si il existe de la droite (d) et du cercle (c)
 * @author Jean-Claude Lhote
 */
export function intersectionLCCoord (D: Line, C: Circle, n: 1 | 2 = 1) {
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
  const [A, B] = [L.A, L.B]
  if (x !== undefined && distance(A, B) > C.radius) {
    if (x < Math.max(A.x, B.x) && x > Math.min(A.x, B.x)) {
      return intersectionLCCoord(L, C, 1)
    } else {
      return intersectionLCCoord(L, C, 2)
    }
  } else return [undefined, undefined]
}

/**
 * M = pointIntersectionCC(c1,c2,'M') // M est le point d'intersection le plus haut des cercles c1 et c2
 * M = pointIntersectionCC(c1,c2,'M',2) // M est le point d'intersection le plus bas des cercles c1 et c2
 * La fonction ne renvoie rien si les cercles n'ont pas de points d'intersection
 * @author Rémi Angot
 * @Source https://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci
 */
export function intersectionCCCoord (C1: Circle, C2: Circle, n: 1 | 2 = 1) {
  const O1 = C1.center
  const O2 = C2.center
  const r0 = C1.radius
  const r1 = C2.radius
  const x0 = O1.x
  const x1 = O2.x
  const y0 = O1.y
  const y1 = O2.y
  const dx = x1 - x0
  const dy = y1 - y0
  const d = Math.sqrt(dy * dy + dx * dx)
  if (d > r0 + r1) {
    return [undefined, undefined]
  }
  if (d < Math.abs(r0 - r1)) {
    return [undefined, undefined]
  }
  const a = (r0 * r0 - r1 * r1 + d * d) / (2.0 * d)
  const x2 = x0 + (dx * a) / d
  const y2 = y0 + (dy * a) / d
  const h = Math.sqrt(r0 * r0 - a * a)
  const rx = -dy * (h / d)
  const ry = dx * (h / d)
  const xi = x2 + rx
  const xiPrime = x2 - rx
  const yi = y2 + ry
  const yiPrime = y2 - ry
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
/**
 * Renvoie 'M' le point d'intersection des droites d1 et d2
 * @param {Droite} d1
 * @param {Droite} d2
 * @param {string} [M=''] Nom du point d'intersection. Facultatif, vide par défaut.
 * @param {string} [positionLabel='above'] Facultatif, 'above' par défaut.
 * @return {Point} Point 'M' d'intersection de d1 et de d2
 * @author Jean-Claude Lhote
 */
export function intersectionLLCoord (L1: Line, L2: Line) {
  const [da, db, dc] = L1.equation
  const [fa, fb, fc] = L2.equation
  let x: number, y: number
  if (fa * db - fb * da === 0) {
    return [undefined, undefined]
  } else {
    y = (fc * da - dc * fa) / (fa * db - fb * da)
  }
  if (da === 0) { // si d est horizontale alors f ne l'est pas donc fa<>0
    x = (-fc - fb * y) / fa
  } else { // d n'est pas horizontale donc ...
    x = (-dc - db * y) / da
  }
  return [x, y]
}
