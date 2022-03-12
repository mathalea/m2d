import { MarkAngle } from './elements/marks/MarkAngle'
/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

// Initialisation

import { Circle } from './elements/lines/Circle'
import { Segment } from './elements/lines/Segment'
import { PerpendicularBisector } from './elements/lines/PerpendicularBisector'
import { PointIntersectionCC } from './elements/points/PointIntersectionCC'
import { Figure } from './Figure'
import { addButtons } from './gui/addButtons'

const figure = new Figure()
const body = document.querySelector('body')
const texteLatex = document.createElement('pre')
const btnLatex = document.createElement('button')
btnLatex.innerHTML = 'Obtenir LaTeX'
btnLatex.addEventListener('click', () => {
  texteLatex.innerHTML = figure.latex
})
if (body) {
  body.appendChild(figure.svg)
  body.appendChild(btnLatex)
  body.appendChild(texteLatex)
}

figure.svg.style.margin = 'auto'
figure.svg.style.display = 'block'
figure.svg.style.border = 'solid'

// Ma figure

const A = figure.point(-4, 0, { label: 'A' })
const B = figure.point(3, 0)
const C1 = new Circle(A, 3)
const C2 = new Circle(B, 3)
const M = new PointIntersectionCC(C1, C2)
const sMB = new Segment(M, B)
const med = new PerpendicularBisector(sMB)
med.dashed = true
const c = new MarkAngle(A, B, M)
const sAB = new Segment(A, B)
for (const parent of c.parents) {
  console.log(parent.exist)
}

// Options

// displayEditor(figure)
addButtons(figure)
