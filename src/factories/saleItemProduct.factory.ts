import { SaleItemProduct } from '../services/saleItemProduct/saleItemProduct.types'
import * as saleItemProductValidator from '../validations/saleItemProduct.validator'

export const toNewSaleItemProduct = async (saleItemProduct: any): Promise<SaleItemProduct> => {
  await saleItemProductValidator.newSaleItemProductIsValid(saleItemProduct)

  return {
    id: saleItemProduct.id,
    saleItemId: saleItemProduct.saleItemId,
    productId: saleItemProduct.productId,
    quantity: saleItemProduct.quantity,
    discount: saleItemProduct.discount,
    createdBy: saleItemProduct.createdBy,
    updatedBy: saleItemProduct.updatedBy,
    createdAt: saleItemProduct.createdAt,
    updatedAt: saleItemProduct.updatedAt,
    delete: saleItemProduct.delete
  }
}
