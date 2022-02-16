import { angle, angleOriented } from './calculus/trigonometry'
import { PointOnCircle } from './elements/PointOnCircle'
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
const B = figure.point(4, 0)
const C = figure.circle(A, B)
const M = new PointOnCircle(figure, C, 93)
figure.segment(B, M)
console.log(angle(M, A, B))
console.log(angleOriented(M, A, B))
const s = figure.segment(A, M)
console.log(s.angleWithHorizontal)
