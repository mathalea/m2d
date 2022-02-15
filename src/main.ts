import { Figure } from './Figure'

const translation = Figure.translation

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
const B = figure.point(3, 5)
figure.segment(A, B, { thickness: 2, color: 'blue' })
figure.circle(B, A)
const C = figure.circle(A, 2)
