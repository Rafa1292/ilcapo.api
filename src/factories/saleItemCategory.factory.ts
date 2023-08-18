import { SaleItemCategory } from '../services/saleItemCategory/saleItemCategory.types'
import * as saleItemCategoryValidator from '../validations/saleItemCategory.validator'

export const toNewSaleItemCategory = async (saleItemCategory: any): Promise<SaleItemCategory> => {
  await saleItemCategoryValidator.newSaleItemCategoryIsValid(saleItemCategory)

  return {
    id: saleItemCategory.id,
    name: saleItemCategory.name,
    saleItems: saleItemCategory.saleItems,
    createdBy: saleItemCategory.createdBy,
    updatedBy: saleItemCategory.updatedBy,
    createdAt: saleItemCategory.createdAt,
    updatedAt: saleItemCategory.updatedAt,
    delete: saleItemCategory.delete
  }
}
