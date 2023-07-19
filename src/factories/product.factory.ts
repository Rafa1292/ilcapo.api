import { Product } from '../services/product/product.types'
import * as productValidator from '../validations/product.validator'
import { toNewProductModifiers } from './productModifier.factory'

export const toNewProduct = async (product: any): Promise<Product> => {
  await productValidator.newProductIsValid(product)

  return {
    id: product.id,
    name: product.name,
    allowsModify: product.allowsModify,
    description: product.description,
    pictureUrl: product.pictureUrl,
    productModifiers: await toNewProductModifiers(product.productModifiers),
    createdBy: product.createdBy,
    updatedBy: product.updatedBy,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    delete: product.delete
  }
}

export const toNewProducts = async (products: any[]): Promise<Product[]> => {
  return await Promise.all(products.map(async (product: any) => await toNewProduct(product)))
}
