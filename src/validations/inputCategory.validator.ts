import { getInputCategoriesWithDeletedItems } from '../services/inputCategory/inputCategory.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const inputCategories = await getInputCategoriesWithDeletedItems()
  const inputCategory = inputCategories.find((inputCategory) => inputCategory.name.toLowerCase() === name.toLowerCase())
  if (inputCategory !== null && inputCategory !== undefined) {
    if (inputCategory?.id !== id) {
      if (inputCategory.delete) {
        throw new Error('Este nombre ya existe y fue borrado. Si desea recuperarlo dirigase a la sección de categorias de insumo borradas')
      }
      throw new Error('Este nombre de categoria ya existe')
    }
  }
}

export const newInputCategoryIsValid = async (inputCategory: any): Promise<boolean> => {
  parseName(inputCategory?.name)
  await validateUniqueName(inputCategory?.name, inputCategory?.id)
  return true
}
