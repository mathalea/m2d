import { Angle } from '../measures/Angle'
import { Measure } from '../measures/Measure'
import { Point } from '../points/Point'
import { PointOnLineAtD } from '../points/PointOnLineAtD'
import { Arc } from './Arc'
import { Segment } from './Segment'
/**
 * Crée un arc défini par les côtés [OA) et [OB) et qui a un rayon donné (radius = 1 par défaut)
 * radius peut être un nombre (constante) ou une instance des classes dérivées de Measure
 */
export class ArcBy3Points extends Arc {
  constructor (A: Point, O: Point, B: Point, { radius = 1, color = 'black', thickness = 1, dashed = false }: {radius?: number | Measure, color?: string, thickness?: number, dashed?: boolean} = {}) {
    const sOA = new Segment(O, A, { temp: true })
    const M = new PointOnLineAtD(sOA, radius, { temp: true })
    const dynamicAngle = new Angle(A, O, B)
    super(O, M, dynamicAngle, { color, thickness, dashed })
  }
}
