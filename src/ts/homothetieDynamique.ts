/*
 * Created by Angot Rémi and Lhote Jean-Claude on 15/02/2022.
 *
 * MathALEA 2D : Software for animating online dynamic mathematics figures
 * https://coopmaths.fr
 * @Author Angot Rémi and Lhote Jean-Claude (contact@coopmaths.fr)
 * @License: GNU AGPLv3 https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Figure } from './Figure'
import { Ray } from './elements/lines/Ray'
import { Cursor } from './elements/others/Cursor'
import { VectorByPoints } from './elements/others/VectorByPoints'
import { PointByHomothetie } from './elements/points/PointByHomothetie'
import { Polygon } from './elements/lines/Polygon'
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

// On créé des points à partir de leur coordonnées

const A = figure.point(0, 2, { label: 'A' })
const B = figure.point(4, -2, { label: 'B' })
const C = figure.point(7, 3, { label: 'C' })
const D = figure.point(-1, 2, { label: 'D' })
const c = new Cursor(figure, -5, 5, { min: -2, max: 2, step: 0.1, length: 3, value: 0 })
const v = new VectorByPoints(C, A)
const M = new PointByTranslationVector(B, v, { label: 'M' })
const P = new Polygon(A, C, B, M)
P.thickness = 2
P.color = 'blue'
P.fill = 'yellow'
P.opacity = 1

const N = new PointByHomothetie(A, D, c.algebraic, { label: '' })
const U = new PointByHomothetie(C, D, c.algebraic, { label: '' })
const V = new PointByHomothetie(M, D, c.algebraic, { label: '' })
const W = new PointByHomothetie(B, D, c.algebraic, { label: '' })
const Q = new Polygon(N, V, W, U)
Q.thickness = 1
Q.color = 'red'
Q.fill = 'orange'
Q.opacity = 0.5

const DB = new Ray(D, B)
DB.dashed = true
const DC = new Ray(D, C)
DC.dashed = true
const DA = new Ray(D, A)
DA.dashed = true
const DM = new Ray(D, M)
DM.dashed = true
DA.opacity = 0.3
DM.opacity = 0.3
DB.opacity = 0.3
DC.opacity = 0.3
