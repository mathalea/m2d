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
import { Mediatrice } from './elements/lines/Mediatrice'
import { Segment } from './elements/lines/Segment'
import { MarkAngle } from './elements/marks/MarkAngle'
import { Point } from './elements/points/Point'
import { PointIntersectionCC } from './elements/points/PointIntersectionCC'
import { PointIntersectionLC } from './elements/points/PointIntersectionLC'
import { PointIntersectionLL } from './elements/points/PointIntersectionLL'
import { Figure } from './Figure'
import { addButtons } from './gui/addButtons'
import { displayEditor } from './gui/displayEditor'

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

const A = new Point(figure, 0, 0, { label: 'A' })
const B = new Point(figure, 4, -3, { label: 'B' })
const M = new Point(figure, 4, 0, { label: 'M' })
const mark = new MarkAngle(A, M, B, { dashed: true, color: 'blue', thickness: 3 })
const sMA = new Segment(M, A)
const sMB = new Segment(M, B)

// Options

// displayEditor(figure)
// addButtons(figure)
