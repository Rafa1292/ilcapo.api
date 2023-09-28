import { z } from 'zod'
import { Product } from '../services/product/product.types'
import { productModifierSchema } from './productModifier.factory'
import { getProductByName } from '../services/product/product.service'

export const productSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
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
  productModifiers: z.union([z.array(productModifierSchema), z.undefined()])

})

export const validateProduct = async (product: any): Promise<Product> => {
  const result = await productSchema.safeParseAsync(product)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  await validateName(result.data.name, result.data.id)

  return result.data
}

export const validatePartialProduct = async (product: any): Promise<Partial<Product>> => {
  const result = await productSchema.partial().safeParseAsync(product)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateProducts = async (products: any[]): Promise<Product[]> => {
  return await Promise.all(products.map(async (product: any) => await validateProduct(product)))
}

const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getProductByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}
