import { Segment } from './elements/lines/Segment'
import { Figure } from './Figure'
import { Point } from './elements/points/Point'
/**
 * Fichier de tests unitaires
 */
const figure = new Figure()

export function testAll (): boolean {
  let result = true
  try {
    testPoint()
  } catch (error) {
    console.log('erreur dans testPoint')
    console.log(error)
    result = false
  }
  try {
    testSegment()
  } catch (error) {
    console.log('erreur dans testSegment')
    console.log(error)
    result = false
  }
  return result
}

function testPoint (): boolean {
  let result = true
  try {
    for (let x = -10; x < 10; x += 2) {
      for (let y = -10; y < 10; y += 2) {
        const M = new Point(figure, x, y)
      }
    }
  } catch (error) {
    result = false
    console.log(error)
  }
  return result
}

function testSegment () : boolean {
  let result = true
  try {
    const M = new Point(figure, 5, 5, { temp: true, style: '' })
    const N = new Point(figure, 5, 5, { temp: true, style: '' })
    for (let x = -10; x < 0; x++) {
      for (let y = 0; y < 10; y++) {
        M.moveTo(x, y)
        N.moveTo(y, x)
        const s = new Segment(M, N)
        M.removeChild(s)
        N.removeChild(s)
      }
    }
  } catch (error) {
    result = false
    console.log(error)
  }
  return result
}
