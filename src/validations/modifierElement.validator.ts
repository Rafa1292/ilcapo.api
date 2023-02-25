import { getModifierElementsWithDeletedItems } from '../services/modifierElement/modifierElement.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const modifierElements = await getModifierElementsWithDeletedItems()
  const modiifierElement = modifierElements.find((x) => x.name.toLowerCase() === name.toLowerCase())
  if (modiifierElement !== null && modiifierElement !== undefined) {
    if (modiifierElement?.id !== id) {
      if (modiifierElement.delete) {
        throw new Error('Este nombre ya existe y fue borrado. Si desea recuperarlo dirigase a la sección de grupos borrados')
      }
      throw new Error('Este nombre de grupo ya existe')
    }
  }
}

export const newModifierElementIsValid = async (modifierElement: any): Promise<boolean> => {
  parseName(modifierElement?.name)
  await validateUniqueName(modifierElement?.name, modifierElement?.id)
  return true
}
