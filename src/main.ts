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
const B = A.translation(2, 0, { free: true })
const C = A.rotation(B, 90)
const D = B.rotation(C, 90)
figure.polygon([A, B, C, D])

// // Par défaut le polygone masque les points
// // const p = figure.polygon([A, B, C])
// // p.color = 'blue'
