
import { Figure } from './Figure'
import { Ray } from './elements/lines/Ray'
import { Bissectrice } from './elements/lines/Bissectrice'
import { Angle } from './elements/measures/Angle'
import { DisplayMeasure } from './elements/texts/DisplayMeasure'
import { CalculDynamic } from './elements/measures/CalculDynamic'
import { PointByRotation } from './elements/points/PointByRotation'
import { Vector } from './elements/others/Vector'
import { PointByTranslationVector } from './elements/points/PointByTranslationVector'

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

console.log(figure)

// On créé des points à partir de leur coordonnées

const A = figure.point(0, 2, { label: 'A' })
const B = figure.point(4, -2, { label: 'B' })
const C = figure.point(7, 3, { label: 'C' })
const angle1 = new Angle(A, B, C)
const angle2 = new Angle(B, C, A)
const angle3 = new Angle(C, A, B)
const angle4 = new Angle(A, B, 60)
const D = new PointByRotation(A, B, angle4, { temp: true })
const t4 = new Ray(B, D)
const b = new Bissectrice(A, B, C, { thickness: 3, color: 'red' })
const dBA = new Ray(B, A)
dBA.dashed = true
const dBC = new Ray(B, C)

const halfAngle = new CalculDynamic(a => a[0].value / 2, [angle1])
const somme = new CalculDynamic(a => a[0].value + a[1].value + a[2].value, [angle1, angle2, angle3])
const t = new DisplayMeasure(-5, -1, angle1, { textBefore: 'ABC = ', textAfter: '°' })
const t2 = new DisplayMeasure(-5, -2, halfAngle, { textBefore: 'ABC / 2 = ', textAfter: '°' })
const t3 = new DisplayMeasure(-5, -3, somme, { textBefore: 'Somme des 3 angles = ', textAfter: '°' })
const v = new Vector(figure, 3, -3)
const M = new PointByTranslationVector(B, v)
