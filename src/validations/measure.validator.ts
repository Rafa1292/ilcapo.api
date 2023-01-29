import { getMeasuresWithDeletedItems } from '../services/measure/measure.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const maxLenght = (text: string, max: number): string => {
  if (text.length > max) {
    throw new Error(`The text is too long. Max ${max} characters`)
  }
  return text
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const measures = await getMeasuresWithDeletedItems()
  const measure = measures.find((measure) => measure.name.toLowerCase() === name.toLowerCase())
  if (measure !== null && measure !== undefined) {
    if (measure?.id !== id) {
      if (measure.delete) {
        throw new Error('Este nombre ya existe y fue borrado. Si desea recuperarlo dirigase a la sección de medidas borradas')
      }
      throw new Error('Este nombre de medida ya existe')
    }
  }
}

export const newMeasureIsValid = async (measure: any): Promise<boolean> => {
  parseName(measure?.name)
  parseName(measure?.abbreviation)
  maxLenght(measure?.abbreviation, 3)
  await validateUniqueName(measure?.name, measure?.id)
  return true
}
