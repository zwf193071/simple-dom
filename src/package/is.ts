export const array = Array.isArray
export function primitive(s: any) {
  return typeof s === 'string' || typeof s === 'number'
}
