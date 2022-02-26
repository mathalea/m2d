
import { Figure } from './Figure'
import { Line2 } from './elements/points/Line2'

/**
 * Script qui permet de tester M2D
 */

// On créé un espace de travail avec les réglages par défaut
const figure = new Figure()

// On l'ajoute au dom
const body = document.querySelector('body')
const btn = document.createElement('button')
btn.innerHTML = 'Obtenir LaTeX'
const texteLatex = document.createElement('pre')
if (body) {
  body.appendChild(figure.svg)
  body.appendChild(btn)
  body.appendChild(texteLatex)
}

btn.addEventListener('click', () => {
  texteLatex.innerHTML = figure.latex
})

figure.svg.style.margin = 'auto'
figure.svg.style.display = 'block'
figure.svg.style.border = 'solid'

// On créé des points à partir de leur coordonnées

const A = figure.point(0, 2, { label: 'A' })
const B = figure.point(4, -2, { label: 'B' })
const L = new Line2(A, B)
L.color = 'green'
L.thickness = 2
