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

const A = figure.point(0, 0, { style: 'o' })
const B = figure.point(-2, -1)
const C = A.homothetie(B, -2)
const D = figure.circle(A, B)
figure.circle(B, C)
D.thickness = 3
D.color = 'orange'
console.log(figure.tex)
