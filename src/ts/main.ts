
import { Figure } from './Figure'
import { Line } from './elements/lines/Line'
import { Segment } from './elements/lines/Segment'
import { LinePerpendicularByPoint } from './elements/lines/LinePerpendicularlByPoint'
import { Vector } from './elements/others/Vector'
import { LineByPointVector } from './elements/lines/LineByPointVector'
import { Point } from './elements/points/Point'
import { VectorNormal } from './elements/others/VectorNormal'
import { Mediatrice } from './elements/lines/Mediatrice'
import { PointIntersectionLL } from './elements/points/PointIntersectionLL'
import { Circle } from './elements/lines/Circle'
import { Polygon } from './elements/lines/Polygon'
import { Bissectrice } from './elements/lines/Bissectrice'
import { Ray } from './elements/lines/Ray'
import { LineParallelByPoint } from './elements/lines/LineParallelByPoint'
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

const A = figure.point(-4, 2, { label: 'A' })
const B = figure.point(3, -2, { label: 'B' })
const C = figure.point(2, 5, { label: 'C' })
const sAB = new Segment(A, B)
const mAB = new Mediatrice(sAB)
const p = new Polygon(A, B, C)
const d = new Bissectrice(C, B, A)
const D = figure.point(0, 0, { label: 'D' })
const r = new Ray(D, B)
const e = new LineParallelByPoint(mAB, A)
const E = new PointIntersectionLL(sAB, mAB)
p.color = 'blue'
p.thickness = 3
mAB.dashed = true


//const v = new VectorNormal(L)

// const A = new Point(figure, 0, 0)
// const v = new Vector(figure, 3, 1)
// const L = new LineByPointVector(A, v)
// L.vector.y = -5
