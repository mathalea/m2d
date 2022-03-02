/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from './Figure'
/**
 * Script qui permet de tester M2D
 */

// On créé un espace de travail avec les réglages par défaut
const figure = new Figure({ dx: 2, dy: 1 })

// On l'ajoute au dom
const body = document.querySelector('body')
const btnLatex = document.createElement('button')
btnLatex.innerHTML = 'Obtenir LaTeX'
const btnDrag = document.createElement('button')
btnDrag.innerHTML = 'Drag'
const btnNewPoint = document.createElement('button')
btnNewPoint.innerHTML = 'Nouveau point'
const btnNewSegment = document.createElement('button')
btnNewSegment.innerHTML = 'Segment'
const btnRed = document.createElement('button')
btnRed.style.backgroundColor = 'red'
btnRed.style.width = '20px'
btnRed.style.height = '20px'
const btnGreen = document.createElement('button')
btnGreen.style.backgroundColor = 'green'
btnGreen.style.width = '20px'
btnGreen.style.height = '20px'
const texteLatex = document.createElement('pre')
if (body) {
  body.appendChild(figure.svg)
  body.appendChild(btnLatex)
  body.appendChild(btnDrag)
  body.appendChild(btnNewPoint)
  body.appendChild(btnNewSegment)
  body.appendChild(texteLatex)
  body.appendChild(btnRed)
  body.appendChild(btnGreen)
}

btnLatex.addEventListener('click', () => {
  texteLatex.innerHTML = figure.latex
})
btnDrag.addEventListener('click', () => {
  figure.pointerAction = 'drag'
})
btnNewPoint.addEventListener('click', () => {
  figure.pointerAction = 'newPoint'
})
btnNewSegment.addEventListener('click', () => {
  figure.pointerAction = 'newSegment'
})
btnRed.addEventListener('click', () => {
  figure.pointerAction = 'setColor'
  figure.pointerSetOptions.color = 'red'
})
btnGreen.addEventListener('click', () => {
  figure.pointerAction = 'setColor'
  figure.pointerSetOptions.color = 'green'
})

figure.svg.style.margin = 'auto'
figure.svg.style.display = 'block'
figure.svg.style.border = 'solid'

const A = figure.point(-4, 2, { label: 'A' })
const B = figure.point(3, -2, { label: 'O' })