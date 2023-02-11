import { InputCategory, NewInputCategory } from './inputCategory.types'
import { InputCategoryModel } from '../../db/models/inputCategory.model'
import { toNewInputCategory } from '../../factories/inputCategory.factory'

export const getInputCategories = async (): Promise<InputCategory[]> => {
  return await InputCategoryModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'inputs',
          where: {
            delete: false
          }
        }
      ]
    }
  )
}

export const getInputCategoriesWithDeletedItems = async (): Promise<InputCategory[]> => {
  return await InputCategoryModel.findAll()
}

export const getInputCategoryById = async (id: number): Promise<InputCategory> => {
  const response = await InputCategoryModel.findByPk(id)
  if (response === null) throw new Error('InputCategory not found')
  if (response.delete) throw new Error('InputCategory deleted')
  return await toNewInputCategory(response)
}

export const saveInputCategory = async (inputCategory: NewInputCategory): Promise<InputCategory> => {
  return await InputCategoryModel.create(inputCategory)
}

export const updateInputCategory = async (inputCategory: Partial<InputCategory>, id: number): Promise<void> => {
  await InputCategoryModel.update(inputCategory, { where: { id } })
}

export const deleteInputCategory = async (id: number): Promise<void> => {
  const inputCategory = await getInputCategoryById(id)
  inputCategory.delete = true
  await updateInputCategory(inputCategory, id)
}

export const recoveryInputCategory = async (id: number): Promise<void> => {
  const inputCategory = await getInputCategoryById(id)
  inputCategory.delete = false
  await updateInputCategory(inputCategory, id)
}
