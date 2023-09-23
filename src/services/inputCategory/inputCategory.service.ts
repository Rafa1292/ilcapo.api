import { InputCategory, InputCategoryAttributes } from './inputCategory.types'
import { InputCategoryModel } from '../../db/models/inputCategory.model'

export const getInputCategories = async (): Promise<InputCategory[]> => {
  return await InputCategoryModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'inputs'
        }
      ]
    }
  )
}

export const getInputCategoriesWithDeletedItems = async (): Promise<InputCategory[]> => {
  return await InputCategoryModel.findAll()
}

export const getInputCategoryById = async (id: number): Promise<InputCategory> => {
  const inputCategory = await InputCategoryModel.findByPk(id)
  if (inputCategory === null) throw new Error('InputCategory not found')
  if (inputCategory.delete) throw new Error('InputCategory deleted')
  return inputCategory
}

export const saveInputCategory = async (inputCategory: InputCategory): Promise<InputCategory> => {
  const { id, ...rest } = InputCategoryModel.getInputCategory(inputCategory, 0)
  return await InputCategoryModel.create(rest)
}

export const updateInputCategory = async (inputCategory: Partial<InputCategoryAttributes>, id: number): Promise<void> => {
  const updateInputCategory = InputCategoryModel.getPartialInputCategory(inputCategory, id)
  await InputCategoryModel.update(updateInputCategory, { where: { id } })
}

export const deleteInputCategory = async (id: number): Promise<void> => {
  await updateInputCategory({ delete: true }, id)
}

export const recoveryInputCategory = async (id: number): Promise<void> => {
  await updateInputCategory({ delete: false }, id)
}
