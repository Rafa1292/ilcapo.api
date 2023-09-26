import { getInputsWithDeletedItems } from '../services/input/input.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const inputs = await getInputsWithDeletedItems()
  const input = inputs.find((input) => input.name.toLowerCase() === name.toLowerCase())
  if (input !== null && input !== undefined) {
    if (input?.id !== id) {
      throw new Error('Este nombre de insumo ya existe')
    }
  }
}

export const newInputIsValid = async (input: any): Promise<boolean> => {
  parseName(input?.name)
  await validateUniqueName(input?.name, input?.id)
  return true
}
