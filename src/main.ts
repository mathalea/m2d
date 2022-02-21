import { Circle } from './elements/Circle'
import { Line } from './elements/Line'
import { PointByReflectionOverLine } from './elements/PointByReflectionOverLine'
import { PointByRotation } from './elements/PointByRotation'
import { PointBySimilitude } from './elements/PointBySimilitude'
import { PointIntersectionLC } from './elements/PointIntersectionLC'
import { PointOnCircle } from './elements/PointOnCircle'
import { PointOnLine } from './elements/PointOnLine'
import { Segment } from './elements/Segment'
import { Figure } from './Figure'

/**
 * Script qui permet de tester M2D
 */

// On créé un espace de travail avec les réglages par défaut
const figure = new Figure()

// On l'ajoute au dom
const body = document.querySelector('body')
if (body) body.appendChild(figure.svg)
figure.svg.style.margin = 'auto'
figure.svg.style.display = 'block'
figure.svg.style.border = 'solid'
figure.svg.style.backgroundColor = 'lightcyan'

// On créé des points à partir de leur coordonnées

const A = figure.point(0, 0)
const B = figure.point(4, 1)
const L = new Segment(A, B)
const M = figure.point(2, 3)
const C = new Circle(M, 3)
// const N = new PointIntersectionLC(L, C)
const P = new PointOnLine(L, { length: 2 })
