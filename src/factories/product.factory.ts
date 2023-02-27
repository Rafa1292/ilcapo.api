import { Product } from '../services/product/product.types'
import * as productValidator from '../validations/product.validator'

export const toNewProduct = async (product: any): Promise<Product> => {
  await productValidator.newProductIsValid(product)

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    allowsModify: product.allowsModify,
    description: product.description,
    pictureUrl: product.pictureUrl,
    createdBy: product.createdBy,
    updatedBy: product.updatedBy,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    delete: product.delete
  }
}
