import { z } from 'zod'
import { ProductModifier } from '../services/productModifier/productModifier.types'
import { modifierGroupSchema, validateModifierGroup } from './modifierGroup.factory'

export const productModifierSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  productId: z.number({
    required_error: 'El producto es requerido',
    invalid_type_error: 'El producto debe ser un numero entero',
  }),
  modifierGroupId: z.number({
    required_error: 'El grupo de modificadores es requerido',
    invalid_type_error: 'El grupo de modificadores debe ser un numero entero',
  }),
  order: z.number({
    required_error: 'El orden es requerido',
    invalid_type_error: 'El orden debe ser un numero entero',
  }),
  maxSelect: z.number({
    required_error: 'El maximo de seleccion es requerido',
    invalid_type_error: 'El maximo de seleccion debe ser un numero entero',
  }),
  minSelect: z.number({
    required_error: 'El minimo de seleccion es requerido',
    invalid_type_error: 'El minimo de seleccion debe ser un numero entero',
  }),
  price: z.number({
    required_error: 'El precio es requerido',
    invalid_type_error: 'El precio debe ser un numero entero',
  }),
  priceByGroup: z.boolean({
    required_error: 'El precio por grupo es requerido',
    invalid_type_error: 'El precio por grupo debe ser un booleano',
  }),
  modifierGroup: modifierGroupSchema
})

export const validateProductModifier = async (productModifier: any): Promise<ProductModifier> => {
  const result = await productModifierSchema.safeParseAsync(productModifier)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialProductModifier = async (productModifier: any): Promise<Partial<ProductModifier>> => {
  const result = await productModifierSchema.partial().safeParseAsync(productModifier)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateProductModifiers = async (productModifiers: any[]): Promise<ProductModifier[]> => {
  return await Promise.all(productModifiers.map(async (productModifier: any) => await validateProductModifier(productModifier)))
}
