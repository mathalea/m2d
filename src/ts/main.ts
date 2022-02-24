
import { LinePerpendicularByPoint } from './elements/LinePerpendicularlByPoint'
import { Segment } from './elements/Segment'
import { Figure } from './Figure'
import { renderMathInDocument } from 'mathlive'
import { Text } from './elements/Text'

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
const math = document.createElement('div')
math.innerHTML = '$\\dfrac{3}{4}$'
if (body) {
  body.appendChild(math)
  body.appendChild(figure.svg)
  body.appendChild(btn)
  body.appendChild(texteLatex)
}

btn.addEventListener('click', () => {
  texteLatex.innerHTML = figure.tex
})

figure.svg.style.margin = 'auto'
figure.svg.style.display = 'block'
figure.svg.style.border = 'solid'
figure.svg.style.backgroundColor = 'lightcyan'

// On créé des points à partir de leur coordonnées

const t = new Text(figure, -3, 0, '$\\pi$')
const A = figure.point(4, 0)
const B = figure.point(4, 1)
const dAB = new Segment(A, B)
const C = figure.point(0, 3)

const L = new LinePerpendicularByPoint(dAB, C)
const t2 = new Text(figure, -5, 0, '$\\pi$')
renderMathInDocument({ TeX: { delimiters: { display: [['\\[', '\\]$']], inline: [['$', '$']] } } })

math.style.position = 'absolute'

const rect = figure.svg.getBoundingClientRect()

math.style.left = `${rect.x + 30 * 5}px`
math.style.top = `${rect.y + 30 * 5}px`