import { z } from 'zod'
import { ProductReference } from '../services/productReference/productReference.types'

const productReferenceSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  modifierElementId: z.number({
    required_error: 'El elemento modificador es requerido',
    invalid_type_error: 'El elemento modificador debe ser un numero entero',
  }),
  productId: z.number({
    required_error: 'El producto es requerido',
    invalid_type_error: 'El producto debe ser un numero entero',
  })
})

export const validateProductReference = async (product: any): Promise<ProductReference> => {
  const result = await productReferenceSchema.safeParseAsync(product)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialProductReference = async (product: any): Promise<Partial<ProductReference>> => {
  const result = await productReferenceSchema.partial().safeParseAsync(product)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateProductReferences = async (productReferences: any[]): Promise<ProductReference[]> => {
  return await Promise.all(productReferences.map(async (productReference: any) => await validateProductReference(productReference)))
}
