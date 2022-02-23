
import { LinePerpendicularByPoint } from './elements/LinePerpendicularlByPoint'
import { PointByRotation } from './elements/PointByRotation'
import { PointByTranslationVector } from './elements/PointByTranslationVector'
import { PointIntersectionLL } from './elements/PointIntersectionLL'
import { PointOnLineAtD } from './elements/PointOnLineAtD'
import { Segment } from './elements/Segment'
import { Vector } from './elements/Vector'
import { Figure } from './Figure'

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
  texteLatex.innerHTML = figure.tex
})

figure.svg.style.margin = 'auto'
figure.svg.style.display = 'block'
figure.svg.style.border = 'solid'
figure.svg.style.backgroundColor = 'lightcyan'

// On créé des points à partir de leur coordonnées

const A = figure.point(0, 0)
const B = figure.point(4, 1)
const dAB = new Segment(A, B)
const C = figure.point(0, 3)

const L = new LinePerpendicularByPoint(dAB, C)
const H = new PointIntersectionLL(dAB, L, { style: 'x' })
const HB = new Segment(H, B)
const M1 = new PointOnLineAtD(HB, 0.4, { style: '' })
const M2 = new PointByRotation(M1, H, 90, { style: '' })
const v = new Vector(H, M1)
const M3 = new PointByTranslationVector(M2, v, { style: '' })
const s1 = new Segment(M1, M3)
const s2 = new Segment(M3, M2)

// const L = new LineByPointVector(C, dAB.directeur)
// L.vector.y = -3
