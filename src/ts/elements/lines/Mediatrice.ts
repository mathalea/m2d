import { Middle } from '../points/Middle'
import { LinePerpendicularByPoint } from './LinePerpendicularlByPoint'
import { OptionsGraphiques, Segment } from './Segment'

export class Mediatrice extends LinePerpendicularByPoint {
  segment: Segment
  constructor(S: Segment, { color = 'black', thickness = 1, temp = false }: OptionsGraphiques = {}) {
    const M = new Middle(S, { temp: true })
    super(S, M, { color, thickness, temp })
  }
}
