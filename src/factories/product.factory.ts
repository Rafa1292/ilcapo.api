import { z } from 'zod'
import { Product } from '../services/product/product.types'
import * as productValidator from '../validations/product.validator'
import { productModifierSchema } from './productModifier.factory'

export const productSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un texto',
  }),
  allowsModify: z.boolean({
    required_error: 'El permite modificar es requerido',
    invalid_type_error: 'El permite modificar debe ser un booleano',
  }),
  pictureUrl: z.string({
    required_error: 'La imagen es requerida',
    invalid_type_error: 'La imagen debe ser un texto',
  }),
  needsCommand: z.boolean({
    required_error: 'El necesita comando es requerido',
    invalid_type_error: 'El necesita comando debe ser un booleano',
  }),
  active: z.boolean({
    required_error: 'El activo es requerido',
    invalid_type_error: 'El activo debe ser un booleano',
  }),
  productModifiers: z.array(productModifierSchema)

})

export const validateProduct = async (product: any): Promise<Product> => {
  const result = await productSchema.safeParseAsync(product)
  await productValidator.newProductIsValid(product)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialProduct = async (product: any): Promise<Partial<Product>> => {
  const result = await productSchema.partial().safeParseAsync(product)
  await productValidator.newProductIsValid(product)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateProducts = async (products: any[]): Promise<Product[]> => {
  return await Promise.all(products.map(async (product: any) => await validateProduct(product)))
}
