import { InputCategory } from '../services/inputCategory/inputCategory.types'
import * as inputCategoryValidator from '../validations/inputCategory.validator'

export const toNewInputCategory = async (inputCategory: any): Promise<InputCategory> => {
  await inputCategoryValidator.newInputCategoryIsValid(inputCategory)

  return {
    id: inputCategory.id,
    name: inputCategory.name,
    createdBy: inputCategory.createdBy,
    updatedBy: inputCategory.updatedBy,
    createdAt: inputCategory.createdAt,
    updatedAt: inputCategory.updatedAt,
    delete: inputCategory.delete
  }
}
