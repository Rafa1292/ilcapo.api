import { z } from 'zod'
import { SaleItemProduct } from '../services/saleItemProduct/saleItemProduct.types'
import * as saleItemProductValidator from '../validations/saleItemProduct.validator'
import { productSchema } from './product.factory'

export const saleItemProductSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  saleItemId: z.number({
    required_error: 'El item de venta es requerido',
    invalid_type_error: 'El item de venta debe ser un numero entero',
  }),
  productId: z.number({
    required_error: 'El producto es requerido',
    invalid_type_error: 'El producto debe ser un numero entero',
  }),
  quantity: z.number({
    required_error: 'La cantidad es requerida',
    invalid_type_error: 'La cantidad debe ser un numero',
  }),
  discount: z.number({
    required_error: 'El descuento es requerido',
    invalid_type_error: 'El descuento debe ser un numero',
  }),
  product: productSchema
})

export const validateSaleItemProduct = async (saleItemProduct: any): Promise<SaleItemProduct> => {
  const result = await saleItemProductSchema.safeParseAsync(saleItemProduct)
  await saleItemProductValidator.newSaleItemProductIsValid(saleItemProduct)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialSaleItemProduct = async (saleItemProduct: any): Promise<Partial<SaleItemProduct>> => {
  const result = await saleItemProductSchema.partial().safeParseAsync(saleItemProduct)
  await saleItemProductValidator.newSaleItemProductIsValid(saleItemProduct)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateSaleItemProducts = async (saleItemProducts: any[]): Promise<SaleItemProduct[]> => {
  return await Promise.all(
    saleItemProducts.map(async (saleItemProduct) => {
      return await validateSaleItemProduct(saleItemProduct)
    })
  )
}
