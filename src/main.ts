import { PointByRotation } from './elements/PointByRotation'
import { PointBySimilitude } from './elements/PointBySimilitude'
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
const C = new PointByRotation(A, B, -30)
figure.circle(C, A)
figure.segment(A, B)
figure.segment(A, C)
figure.segment(B, C)
const A2 = new PointBySimilitude(A, B, 2, 30)
const C2 = new PointBySimilitude(C, B, 2, 30)
