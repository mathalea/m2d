import { Figure } from './Figure'
import { Cursor } from './elements/measures/Cursor'
import { Point } from './elements/points/Point'
import { Segment } from './elements/lines/Segment'
import { Const } from './elements/measures/Const'
import { Arc } from './elements/lines/Arc'
import { Circle } from './elements/lines/Circle'
import { testAll } from './tests'
/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

// Initialisation

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
const k = new Cursor(figure, -4, 7, { min: -2, max: 2, step: 0.1, length: 5, value: 1.2 })
const angle = new Cursor(figure, -4, 6, { min: -180, max: 180, step: 1, length: 5, value: 0 })

const xO = new Const(figure, 0)
const yO = new Const(figure, 0)
const xA = new Const(figure, 5)
const yA = new Const(figure, 0)
const O = new Point(figure, xO, yO, { label: 'O' })
const A = new Point(figure, xA, yA, { label: 'A' })
const B = new Point(figure, 3, 6, { label: 'B' })
const a = new Arc(B, O, 45)
const c = new Circle(A, 5)
const s = new Segment(O, A, { temp: true })
const t = Segment.homothetie(s, O, k)
const u = Segment.similitude(s, A, k, angle)
t.style = '|-|'
u.style = '|-|'
testAll()
// const angle
// const ABisVisible = new CalculDynamic((a:Measure[]) => zero(sommeValue(a)), [])
