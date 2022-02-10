import { M2d } from './M2d'

/**
 * Script qui permet de tester M2D 
 */

// On créé un espace de travail avec les réglages par défaut
const m2d = new M2d()

// On créé des points à partir de leur coordonnées
const A = m2d.point(0, 0, {thickness: 3, color: 'yellow'})
const B = m2d.point(5, -2, {size: 0.4})
const C = m2d.point(7, 3)
const D = m2d.point(-1, 6)
const E = m2d.point(-9, -5)
// m2d.segment(A, B, {color: 'blue'})
// m2d.segment(C, B, {thickness: 2})
m2d.polygon([A, B, C, D, E], {color: 'blue'})


// On insère les objets créé dans l'instance de m2d en modifiant la liste des objets
// Les points doivent être en dernier pour les zones d'effet des clics (à automatiser)


const body = document.querySelector('body')
if (body) body.appendChild(m2d.svgElement)


m2d.svgElement.style.margin = '100'

