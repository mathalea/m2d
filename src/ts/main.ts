import { Figure } from './Figure'
import { PointOnLineAtD } from './elements/points/PointOnLineAtD'
import { PointByRotation } from './elements/points/PointByRotation'
import { PointBySimilitude } from './elements/points/PointBySimilitude'
import { PointByHomothetie } from './elements/points/PointByHomothetie'
import { Segment } from './elements/lines/Segment'
import { Cursor } from './elements/others/Cursor'
import { Point } from './elements/points/Point'
import { RandomInteger } from './elements/measures/randomInteger'
import { Vector } from './elements/others/Vector'
import { PointByTranslationVector } from './elements/points/PointByTranslationVector'
import { Arc } from './elements/lines/Arc'
import { ArcBy3Points } from './elements/lines/ArcBy3PointsAndRadius'
import { RandomNumber } from './elements/measures/randomNumber'
import { Line } from './elements/lines/Line'
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
// const c = new Cursor(figure, -3, 6, { min: 0, max: 6, length: 4, step: 0.1, value: 0 })
// const c2 = new Cursor(figure, -3, 5, { min: -180, max: 180, length: 4, step: 2, value: 0 })
// const c3 = new Cursor(figure, -3, 4, { min: 0, max: 2, length: 4, step: 0.1, value: 0 })
// const c4 = new Cursor(figure, -3, 3, { min: -180, max: 180, length: 4, step: 2, value: 0 })
const c5 = new Cursor(figure, -3, 2, { min: -90, max: 90, length: 4, step: 1, value: 0 })
const c6 = new Cursor(figure, -3, 1, { min: 0, max: 4, length: 4, step: 0.4, value: 0 })
const x = new RandomNumber(figure, 0, 9)
c6.addChild(x)
// const y = new RandomInteger(figure, -5, 5)

const A = figure.point(-4, 0, { label: 'A' })
const B = figure.point(5, 0, { label: 'B' })
const s = new Line(A, B, { temp: true })
const M = new PointOnLineAtD(s, x)
// const M = new PointByHomothetie(B, A, c.algebraic, { label: 'M' })
// const N = new PointByRotation(B, A, c2.algebraic, { label: 'N' })
// const P = new PointBySimilitude(B, A, c3.algebraic, c4.algebraic, { label: 'P' })
// const s = new Segment(N, P)
// const Q = new PointByHomothetie(B, A, c5.algebraic)
// Q.addChild(x)
// Q.addChild(y)
// const R = new Point(figure, x, y, { label: 'R' })
// const V = new Vector(figure, c5.algebraic, c6.algebraic)
// const B = new PointByTranslationVector(A, V)
// const s = new Segment(A, B)
// s.style = '->'
