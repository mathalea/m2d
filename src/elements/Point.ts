import { Figure } from '../Figure'
import { Element2D } from './Element2D'
import { Segment } from './Segment'

type Binome = { x: number, y: number }
export type OptionsPoint = { style?: 'x' | '', size?: number, color?: string, thickness?: number }

export class Point extends Element2D {
  x: number
  y: number
  style: 'x' | ''
  size: number
  g: SVGElement
  svgContainer: Figure
  // On définit un point avec ses deux coordonnées
  constructor(svgContainer: Figure, x: number, y: number, { style = 'x', size = 0.2, thickness = 1, color = 'black' }: OptionsPoint = {}) {
    super()
    this.x = x
    this.y = y
    this.style = style
    this.size = size // Pour la taille de la croix
    this.group = []
    this.svgContainer = svgContainer
    this.thickness = thickness
    this.color = color
    if (this.style === 'x') {
      // Croix avec [AB] et [CD]
      const A = new Point(svgContainer, this.x - this.size, this.y + this.size, { style: '' })
      const B = new Point(svgContainer, this.x + this.size, this.y - this.size, { style: '' })
      const C = new Point(svgContainer, this.x - this.size, this.y - this.size, { style: '' })
      const D = new Point(svgContainer, this.x + this.size, this.y + this.size, { style: '' })
      const sAB = new Segment(A, B, svgContainer, { color: this.color, thickness: this.thickness })
      const sCD = new Segment(C, D, svgContainer, { color: this.color, thickness: this.thickness })
      this.group.push(sAB, sCD)
      this.svgContainer.list.push(this)
    }
    const groupSvg = document.createElementNS("http://www.w3.org/2000/svg", 'g')
    // Le cercle ne doit pas être stylisés, on n'appelle donc pas super.svg()
    for (const e of this.group) {
      e.color = this.color
      e.thickness = this.thickness
      groupSvg.appendChild(e.g)
    }
    this.g = groupSvg
    // On créé un cercle transparent pour la zone d'effet du clic
    // const c = new Circle(new Point(this.x, this.y), this.size)
    // c.thickness = 0
    // groupSvg.appendChild(c.svgContainer(1)) // Le rayon du cercle est défini par this.size en pixels
  }

  moveTo(x: number, y: number) {
    for (const e of this.group) {
      e.moveTranslation(x - this.x, y - this.y)
    }
    this.x = x
    this.y = y

    for (const dependence of this.dependencies) {
      if (dependence.type === 'end1') {
        const segment = dependence.element as Segment
        segment.moveEnd(x, y, 1)
      }
      if (dependence.type === 'end2') {
        const segment = dependence.element as Segment
        segment.moveEnd(x, y, 2)
      }
    }
  }

moveTranslation(x: number, y: number) {
  this.moveTo(this.x + x, this.y + y)
}

notifyMouseMove(x: number, y: number) {
  this.moveTo(x, y)
}

    get distancePointer() {
  if (this.svgContainer.pointerX !== null && this.svgContainer.pointerY !== null) {
    return Math.sqrt((this.x - this.svgContainer.pointerX) ** 2 + (this.y - this.svgContainer.pointerY) ** 2)
  }
  return Infinity
}

/**
 * Translation définie par un couple de coordonnées ou un objet possédant des paramètres x et y
 * Renvoie un nouveau point sans modifier le premier
 */
translation(arg1: number | Binome, arg2 ?: number) {
  let xt: number
  let yt: number
  if (typeof arg1 === 'number') {
    xt = arg1
    yt = arg2 || 0
  } else {
    xt = arg1.x
    yt = arg1.y
  }
  return new Point(this.svgContainer, this.x + xt, this.y + yt)
}

/**
 * Rotation définie par un centre et un angle en degrés
 * Renvoie un nouveau point sans modifier le premier
 */
rotation(O: Point, angle: number) {
  const x = (O.x + (this.x - O.x) * Math.cos((angle * Math.PI) / 180) - (this.y - O.y) * Math.sin((angle * Math.PI) / 180))
  const y = (O.y + (this.x - O.x) * Math.sin((angle * Math.PI) / 180) + (this.y - O.y) * Math.cos((angle * Math.PI) / 180))
  return new Point(this.svgContainer, x, y)
}

/**
 * Homothétie définie par un centre et un rapport
 * Renvoie un nouveau point sans modifier le premier
 */

homothetie(O: Point, k: number) {
  const x = (O.x + k * (this.x - O.x))
  const y = (O.y + k * (this.y - O.y))
  return new Point(this.svgContainer, x, y)
}

/**
 * Similitude définie par un centre, un rapport et un angle en degré
 * Renvoie un nouveau point sans modifier le premier
 */
similitude(O: Point, k: number, angle: number) {
  const angleRadian = angle * Math.PI / 180
  const x = (O.x + k * (Math.cos(angleRadian) * (this.x - O.x) - Math.sin(angleRadian) * (this.y - O.y)))
  const y = (O.y + k * (Math.cos(angleRadian) * (this.y - O.y) + Math.sin(angleRadian) * (this.x - O.x))
  )
  return new Point(this.svgContainer, x, y)
}

notifyDependency(dependency: { element: Element2D, type: string }) {
  this.dependencies.push(dependency)
}
}
