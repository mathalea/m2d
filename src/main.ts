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
const A = figure.point(-5, 0)
A.thickness = 5
A.size = .5
const B = A.translation(5, 0)
const C = B.rotation(A, 60)
// const p = figure.polygon([A, B, C])
// // const s = figure.segment(A, B)
// p.color = 'orange'
// // s.color = 'blue'
// A.color = 'green'
// p.thickness = 3
// // Par défaut le polygone masque les points
// // const p = figure.polygon([A, B, C])
// // p.color = 'blue'
