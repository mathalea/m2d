import { PointIntersectionCC } from './elements/PointIntersectionCC'
import { PointOnLine } from './elements/PointOnLine'
import { PointOnSegment } from './elements/PointOnSegment'
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
const B = figure.point(6, 4)
const s = figure.segment(A, B)
const C1 = figure.circle(A, 4)
const C2 = figure.circle(B, A)
const M = new PointIntersectionCC(C1, C2)
const N = new PointIntersectionCC(C1, C2, 2)
const M1 = new PointOnLine(s)
const M2 = new PointOnSegment(s)
