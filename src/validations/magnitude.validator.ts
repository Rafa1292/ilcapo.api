import { getMagnitudesWithDeletedItems } from '../services/magnitude/magnitude.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const magnitudes = await getMagnitudesWithDeletedItems()
  const magnitude = magnitudes.find((magnitude) => magnitude.name.toLowerCase() === name.toLowerCase())
  if (magnitude !== null && magnitude !== undefined) {
    if (magnitude?.id !== id) {
      if (magnitude.delete) {
        throw new Error('Este nombre ya existe y fue borrado. Si desea recuperarlo dirigase a la sección de magnitudes borradas')
      }
      throw new Error('Este nombre de magnitud ya existe')
    }
  }
}

export const newMagnitudeIsValid = async (magnitude: any): Promise<boolean> => {
  parseName(magnitude?.name)
  await validateUniqueName(magnitude?.name, magnitude?.id)
  return true
}
