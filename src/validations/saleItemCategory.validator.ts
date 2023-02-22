import { getSaleItemCategoriesWithDeletedItems } from '../services/saleItemCategory/saleItemCategory.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const saleItemCategories = await getSaleItemCategoriesWithDeletedItems()
  const saleItemCategory = saleItemCategories.find((saleItemCategory) => saleItemCategory.name.toLowerCase() === name.toLowerCase())
  if (saleItemCategory !== null && saleItemCategory !== undefined) {
    if (saleItemCategory?.id !== id) {
      if (saleItemCategory.delete) {
        throw new Error('Este nombre ya existe y fue borrado. Si desea recuperarlo dirigase a la sección de categorias de ingrediente borradas')
      }
      throw new Error('Este nombre de categoria ya existe')
    }
  }
}

export const newSaleItemCategoryIsValid = async (saleItemCategory: any): Promise<boolean> => {
  parseName(saleItemCategory?.name)
  await validateUniqueName(saleItemCategory?.name, saleItemCategory?.id)
  return true
}
