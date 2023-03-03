import { getModifierElementsWithDeletedItems, recoveryModifierElement } from '../services/modifierElement/modifierElement.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<number | undefined> => {
  const modifierElements = await getModifierElementsWithDeletedItems()
  const modifierElement = modifierElements.find((x) => x.name.toLowerCase() === name.toLowerCase())
  if (modifierElement !== null && modifierElement !== undefined) {
    if (modifierElement?.id !== id) {
      if (modifierElement.delete) {
        await recoveryModifierElement(modifierElement.id)
        return modifierElement.id
      }
      throw new Error('Este nombre de elemento ya existe')
    }
  }
  return undefined
}

export const newModifierElementIsValid = async (modifierElement: any): Promise<number> => {
  parseName(modifierElement?.name)
  const id = await validateUniqueName(modifierElement?.name, modifierElement?.id)
  if (id === undefined) return 0
  return id
}
