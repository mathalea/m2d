import { Element2D } from './elements/Element2D'
import { Circle } from './elements/lines/Circle'
import { Line } from './elements/lines/Line'
import { Polygon } from './elements/lines/Polygon'
import { Ray } from './elements/lines/Ray'
import { Segment } from './elements/lines/Segment'
import { Const } from './elements/measures/Const'
import { Distance } from './elements/measures/Distance'
import { Measure } from './elements/measures/Measure'
import { Middle } from './elements/points/Middle'
import { Point } from './elements/points/Point'
import { PointByHomothetie } from './elements/points/PointByHomothetie'
import { Figure, Save, ElementSaved } from './Figure'

export function loadJson (save: Save, figure: Figure) {
  const elements: (Element2D | Measure)[] = []
  const exIds: {[id:string]: Element2D | Measure} = {}
  for (const e in save) {
    if (save[e].className === 'Point') {
      const x = save[e].arguments[0] as number
      const y = save[e].arguments[1] as number
      const A = new Point(figure, x, y)
      elements.push(A)
      exIds[e] = A
    } else if (save[e].className === 'Middle') {
      const id1 = save[e].arguments[0]
      const id2 = save[e].arguments[1]
      const A = exIds[id1] as Point
      const B = exIds[id2] as Point
      const M = new Middle(new Segment(A, B, { temp: true }))
      elements.push(M)
      exIds[e] = M
    } else if (save[e].className === 'PointByHomothetie') {
      const id1 = save[e].arguments[0]
      const id2 = save[e].arguments[1]
      const id3 = save[e].arguments[2]
      const previous = exIds[id1] as Point
      const center = exIds[id2] as Point
      const k = exIds[id3] as Measure
      const M = new PointByHomothetie(previous, center, k)
      elements.push(M)
      exIds[e] = M
    } else if (save[e].className === 'Line' || save[e].className === 'Segment' || save[e].className === 'Ray') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const A = exIds[id1] as Point
      const B = exIds[id2] as Point
      let s: (Line | Segment | Ray | null) = null
      if (save[e].className === 'Line') s = new Line(A, B)
      else if (save[e].className === 'Segment') s = new Segment(A, B)
      else if (save[e].className === 'Ray') s = new Ray(A, B)
      if (s !== null) {
        elements.push(s)
        exIds[e] = s
      }
    } else if (save[e].className === 'Circle') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const arg1 = exIds[id1] as Point
      const arg2 = exIds[id2] as Point | Measure
      const c = new Circle(arg1, arg2)
      elements.push(c)
      exIds[e] = c
    } else if (save[e].className === 'Distance') {
      const id1 = save[e].arguments[0] as number
      const id2 = save[e].arguments[1] as number
      const A = exIds[id1] as Point
      const B = exIds[id2] as Point
      const distance = new Distance(A, B)
      elements.push(distance)
      exIds[e] = distance
    } else if (save[e].className === 'Const') {
      const k = save[e].arguments[0] as number
      const c = new Const(figure, k)
      elements.push(c)
      exIds[e] = c
    } else if (save[e].className === 'Polygon') {
      const pointsId = save[e].arguments as number[]
      const points: Point[] = []
      for (const id of pointsId) points.push(exIds[id] as Point)
      const p = new Polygon(...points)
      p.color = save[e].color || 'black'
      p.dashed = save[e].dashed || false
      p.thickness = save[e].thickness ?? 1
      elements.push(p)
      exIds[e] = p
    }
    const lastElement = elements[elements.length - 1]
    if (lastElement instanceof Element2D) handleOptions(lastElement, save[e])
  }

  for (const e of elements) {
    if (e instanceof Element2D && !e.isVisible) e.hide()
  }
  return elements
}

function handleOptions (e: Element2D, save: ElementSaved) {
  const { thickness, isVisible, color, dashed } = save
  e.color = color || 'black'
  e.dashed = dashed || false
  if (typeof isVisible === 'boolean') e.isVisible = isVisible
  if (typeof thickness === 'number') e.thickness = thickness
}
