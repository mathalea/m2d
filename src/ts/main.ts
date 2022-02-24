
import { LinePerpendicularByPoint } from './elements/LinePerpendicularlByPoint'
import { PointByRotation } from './elements/PointByRotation'
import { PointByTranslationVector } from './elements/PointByTranslationVector'
import { PointIntersectionLL } from './elements/PointIntersectionLL'
import { PointOnLineAtD } from './elements/PointOnLineAtD'
import { Segment } from './elements/Segment'
import { Vector } from './elements/Vector'
import { Figure } from './Figure'
import { renderMathInDocument } from 'mathlive'
import { Text } from './elements/Text'
import { Polygon } from './elements/Polygon'
import { TextByPoint } from './elements/TextByPoint'

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

// On créé des points à partir de leur coordonnées

const A = figure.point(0, 0)
const B = figure.point(4, 1)
const C = new PointByRotation(A, B, 60)
const p = new Polygon(A, B, C)
window.t = new Text(figure, -4, 0, 'test')
t.text = 'ok'

p.color = 'blue'
p.thickness = 3
//p.style = 'o'
console.log(figure.set) // ToFix la liste est trop importante, il faut supprimer les croix non utilisés et voir si le cercle ne créé pas des points dragable

// const t = new Text(figure, -3, 0, '$\\pi$')
// const A = figure.point(4, 0)
// const B = figure.point(4, 1)
// const dAB = new Segment(A, B)
// const C = figure.point(0, 3)

// const L = new LinePerpendicularByPoint(dAB, C)
// const H = new PointIntersectionLL(dAB, L, { style: 'x' })
// const HB = new Segment(H, B)
// const M1 = new PointOnLineAtD(HB, 0.4, { style: '' })
// const M2 = new PointByRotation(M1, H, 90, { style: '' })
// const v = new Vector(H.parentFigure, H, M1)
// const M3 = new PointByTranslationVector(M2, v, { style: '' })
// const s1 = new Segment(M1, M3)
// const s2 = new Segment(M3, M2)
// const t2 = new Text(figure, -5, 0, '$\\pi$')
// renderMathInDocument({ TeX: { delimiters: { display: [['\\[', '\\]$']], inline: [['$', '$']] } } })

// math.style.position = 'absolute'

// const rect = figure.svg.getBoundingClientRect()

// math.style.left = `${rect.x + 30 * 5}px`
// math.style.top = `${rect.y + 30 * 5}px`
