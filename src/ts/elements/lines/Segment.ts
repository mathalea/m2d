import { Point } from '../points/Point'
import { Line, OptionsGraphiques } from './Line'


export class Segment extends Line {
  constructor(A: Point, B: Point, { color = 'black', thickness = 1, style = '', temp = false, dashed = false }: OptionsGraphiques = {}) {
    super(A, B, 'Segment', { color, thickness, style, temp, dashed })
    this.parentFigure = A.parentFigure
    if (!temp) this.parentFigure.set.add(this)
    if (A.label && B.label) this.label = `[${A.label}${B.label}]`
    if (!temp) this.parentFigure.svg.appendChild(this.g)

    // Les styles ne doivent être appliqués qu'une fois le groupe créé
    this.color = color
    this.thickness = thickness
    this.style = style
    this.dashed = dashed

    // Si une des extrémités se déplace alors on recalcule les coordonnées de line
    A.addDependency(this)
    B.addDependency(this)
  }

  update() {
    [this.x1, this.y1, this.x2, this.y2] = [this.A.x, this.A.y, this.B.x, this.B.y]
    const x1Svg = this.parentFigure.xToSx(this.x1)
    const x2Svg = this.parentFigure.xToSx(this.x2)
    const y1Svg = this.parentFigure.yToSy(this.y1)
    const y2Svg = this.parentFigure.yToSy(this.y2)
    this.g.setAttribute('x1', `${x1Svg}`)
    this.g.setAttribute('y1', `${y1Svg}`)
    this.g.setAttribute('x2', `${x2Svg}`)
    this.g.setAttribute('y2', `${y2Svg}`)
    this.notifyAllDependencies()
  }

  addDependency(dependency) {
    this.dependencies.push(dependency)
  }

  get latex() {
    const arrayOptions: string[] = []
    if (this.color !== 'black') arrayOptions.push(`color = ${this.color}`)
    if (this.thickness !== 1) arrayOptions.push(`line width = ${this.thickness}`)
    if (this.fill !== 'none') arrayOptions.push(`fill = ${this.fill}`)
    if (this.dashed) arrayOptions.push('dashed')
    let txtOptions = ''
    if (arrayOptions) txtOptions = `[${arrayOptions.join(', ')}]`
    let latex = `\n\t% ${this.label ?? 'Droite'}`
    latex += `\n \t \\draw${txtOptions} (${this.x1}, ${this.y1}) -- (${this.x2}, ${this.y2});`
    return latex
  }
}
