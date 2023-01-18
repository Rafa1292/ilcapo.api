export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String
}
