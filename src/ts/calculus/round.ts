
export function arrondi (nombre: number, precision: number = 10) {
  try {
    return (Math.round(nombre * 10 ** precision) / 10 ** precision)
  } catch (error) {
    return NaN
  }
}
