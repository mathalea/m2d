import { Figure } from './Figure'

/**
 * Script qui permet de tester M2D
 */

// On créé un espace de travail avec les réglages par défaut
const figure = new Figure()

// On créé des points à partir de leur coordonnées
const A = figure.point(0, 0, { thickness: 3, color: 'yellow' })
const B = figure.point(5, -2, { size: 0.4 })
const C = figure.point(7, 3)
const D = figure.point(-1, 6)
const E = figure.point(-9, -5)
// m2d.segment(A, B, {color: 'blue'})
// m2d.segment(C, B, {thickness: 2})
figure.polygon([A, B, C, D, E])

// On insère les objets créé dans l'instance de m2d en modifiant la liste des objets
// Les points doivent être en dernier pour les zones d'effet des clics (à automatiser)

const body = document.querySelector('body')
if (body) body.appendChild(figure.svg)

figure.svg.style.margin = '100'
