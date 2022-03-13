import { Angle } from './elements/measures/Angle'
import { CalculDynamic } from './elements/measures/CalculDynamic'
import { Figure } from './Figure'
import { PointByRotation } from './elements/points/PointByRotation'
import { PointByHomothetie } from './elements/points/PointByHomothetie'
import { Cursor } from './elements/others/Cursor'
import { RandomNumber } from './elements/measures/randomNumber'
import { Line } from './elements/lines/Line'
import { PointOnSegment } from './elements/points/PointOnSegment'
import { Measure } from './elements/measures/Measure'
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
const phi = new Cursor(figure, -3, 7, { min: -90, max: 90, length: 6, step: 2, value: 20 })
const theta = new Cursor(figure, -3, 6, { min: -180, max: 180, length: 6, step: 2, value: 0 })
const epsilon = 0.0001
function sommeValue (args:Measure[]): number {
  let somme: number = 0
  for (const element of args) {
    somme += element.value
  }
  return somme
}
function zero (n: number) {
  return Math.abs(n) < epsilon ? 1 : 0
}
function factor (k:number) {
  return k === 0 ? NaN : 1
}

const S = figure.point(0, 5, { label: 'S' })
const O = figure.point(0, 0, { label: 'O' })
const x1 = new CalculDynamic((a:Measure[]) => Math.sin(a[0].value * Math.PI / 180) * 2, [theta.algebraic, phi.algebraic])
const x2 = new CalculDynamic((a:Measure[]) => Math.cos(a[0].value * Math.PI / 180) * 2, [theta.algebraic, phi.algebraic])
const y1 = new CalculDynamic((a:Measure[]) => -Math.cos(a[0].value * Math.PI / 180) * 2 * Math.sin(a[1].value * Math.PI / 180), [theta.algebraic, phi.algebraic])
const y2 = new CalculDynamic((a:Measure[]) => Math.sin(a[0].value * Math.PI / 180) * 2 * Math.sin(a[1].value * Math.PI / 180), [theta.algebraic, phi.algebraic])
const xA = new CalculDynamic((a:Measure[]) => a[0].value + a[1].value, [x1, x2])
const yA = new CalculDynamic((a:Measure[]) => a[0].value + a[1].value, [y1, y2])
const xB = new CalculDynamic((a:Measure[]) => a[0].value - a[1].value, [x1, x2])
const yB = new CalculDynamic((a:Measure[]) => a[0].value - a[1].value, [y1, y2])
const xC = new CalculDynamic((a:Measure[]) => -a[0].value - a[1].value, [x1, x2])
const yC = new CalculDynamic((a:Measure[]) => -a[0].value - a[1].value, [y1, y2])
const xD = new CalculDynamic((a:Measure[]) => -a[0].value + a[1].value, [x1, x2])
const yD = new CalculDynamic((a:Measure[]) => -a[0].value + a[1].value, [y1, y2])

const I = new Point(figure, x1, y1, { label: 'I', style: '' })
const J = new Point(figure, x2, y2, { label: 'J', style: '' })
const K = figure.point(0, 2, { label: 'K' })
const OI = new Segment(O, I, { style: '-' })
const OJ = new Segment(O, J, { style: '-' })
const OK = new Segment(O, K, { style: '->' })
const A = new Point(figure, xA, yA, { label: 'A' })
const B = new Point(figure, xB, yB, { label: 'B' })
const C = new Point(figure, xC, yC, { label: 'C' })
const D = new Point(figure, xD, yD, { label: 'D' })
const SA = new Segment(S, A, { dashed: true })
const SB = new Segment(S, B, { dashed: true })
const SC = new Segment(S, C, { dashed: true })
const SD = new Segment(S, D, { dashed: true })
const AB = new Segment(A, B, { dashed: true })
const BC = new Segment(C, B, { dashed: true })
const DC = new Segment(D, C, { dashed: true })
const AD = new Segment(A, D, { dashed: true })
const angleBAC = new Angle(B, A, C)
const angleCAD = new Angle(C, A, D)
const angleSAB = new Angle(S, A, B)
const angleDAS = new Angle(D, A, S)
const angleSBC = new Angle(S, B, C)
const angleABS = new Angle(A, B, S)
const angleCBD = new Angle(C, B, D)
const angleDBA = new Angle(D, B, A)
const angleSCD = new Angle(S, C, D)
const angleBCS = new Angle(B, C, S)
const angleDCA = new Angle(D, C, A)
const angleACB = new Angle(A, C, B)
const angleADB = new Angle(A, D, B)
const angleBDC = new Angle(B, D, C)
const angleSDA = new Angle(S, D, A)
const angleCDS = new Angle(C, D, S)

const SAVisible = new CalculDynamic((a:Measure[]) => factor(zero(sommeValue(a))), [angleBAC, angleCAD, angleSAB, angleDAS])
const SBVisible = new CalculDynamic((a:Measure[]) => factor(zero(sommeValue(a))), [angleSBC, angleABS, angleCBD, angleDBA])
const SCVisible = new CalculDynamic((a:Measure[]) => factor(zero(sommeValue(a))), [angleSCD, angleBCS, angleDCA, angleACB])
const SDVisible = new CalculDynamic((a:Measure[]) => factor(zero(sommeValue(a))), [angleADB, angleBDC, angleSDA, angleCDS])
const Aprime = new PointByHomothetie(A, S, SAVisible, { temp: true })
const Bprime = new PointByHomothetie(B, S, SBVisible, { temp: true })
const Cprime = new PointByHomothetie(C, S, SCVisible, { temp: true })
const Dprime = new PointByHomothetie(D, S, SDVisible, { temp: true })

const SAprime = new Segment(S, Aprime)
const SBprime = new Segment(S, Bprime)
const SCprime = new Segment(S, Cprime)
const SDprime = new Segment(S, Dprime)

// const angle
// const ABisVisible = new CalculDynamic((a:Measure[]) => zero(sommeValue(a)), [])
