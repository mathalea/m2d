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

import { Segment } from './elements/lines/Segment'
import { Angle } from './elements/measures/Angle'
import { DisplayMeasure } from './elements/texts/DisplayMeasure'
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

const A = figure.point(0, 0, { label: 'A', labelDx: 0.5, labelDy: -0.5 })
const B = figure.point(3, 0, { label: 'B', labelDx: 0.5, labelDy: -0.5 })
const C = figure.point(3, 5, { label: 'C', labelDx: 0.5, labelDy: -0.5 })
const sAB = new Segment(A, B)
const sBC = new Segment(B, C)
sAB.color = 'orange'
sBC.color = 'pink'
const angle = new Angle(A, B, C)
const dis = new DisplayMeasure(-3, 0, angle)
const marque = new MarkAngle(A, B, C)
figure.pointerAction = 'setColor'

// Options

// displayEditor(figure)
addButtons(figure)
