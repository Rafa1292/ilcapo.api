import { getModifierGroupsWithDeletedItems } from '../services/modifierGroup/modifierGroup.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const modifierGroups = await getModifierGroupsWithDeletedItems()
  const modiifierGroup = modifierGroups.find((x) => x.name.toLowerCase() === name.toLowerCase())
  if (modiifierGroup !== null && modiifierGroup !== undefined) {
    if (modiifierGroup?.id !== id) {
      if (modiifierGroup.delete) {
        throw new Error('Este nombre ya existe y fue borrado. Si desea recuperarlo dirigase a la sección de grupos borrados')
      }
      throw new Error('Este nombre de grupo ya existe')
    }
  }
}

export const newModifierGroupIsValid = async (modifierGroup: any): Promise<boolean> => {
  parseName(modifierGroup?.name)
  await validateUniqueName(modifierGroup?.name, modifierGroup?.id)
  return true
}
