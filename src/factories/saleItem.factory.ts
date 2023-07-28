import { SaleItem } from '../services/saleItem/saleItem.types'
import * as saleItemValidator from '../validations/saleItem.validator'

export const toNewSaleItem = async (saleItem: any): Promise<SaleItem> => {
  await saleItemValidator.newSaleItemIsValid(saleItem)

  return {
    id: saleItem.id,
    name: saleItem.name,
    saleItemCategoryId: saleItem.saleItemCategoryId,
    description: saleItem.description,
    pictureUrl: saleItem.pictureUrl,
    createdBy: saleItem.createdBy,
    prices: saleItem.prices,
    updatedBy: saleItem.updatedBy,
    createdAt: saleItem.createdAt,
    updatedAt: saleItem.updatedAt,
    delete: saleItem.delete
  }
}
