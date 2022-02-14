import { Figure } from './Figure'

/**
 * Script qui permet de tester M2D
 */

// On créé un espace de travail avec les réglages par défaut
const figure = new Figure()

// On l'ajoute au dom
const body = document.querySelector('body')
if (body) body.appendChild(figure.svg)
figure.svg.style.margin = '100'

// On créé des points à partir de leur coordonnées

const A = figure.point(0, 0)
const B = A.translation(3, 1)
const C = A.rotation(B, 90)
const s = figure.segment(A, B)
const p = figure.polygon([A, B, C])
s.color = 'blue'
s.thickness = 3
A.thickness = 2
// p.thickness = 6
console.log(figure.tex)

// // Par défaut le polygone masque les points
// // const p = figure.polygon([A, B, C])
// // p.color = 'blue'
