import { Brand } from '../services/brand/brand.types'
import { z } from 'zod'

const brandSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre de la marca es requerido',
    invalid_type_error: 'El nombre de la marca debe ser  un texto',
  })
})

export const validateBrand = async (brand: any): Promise<Brand> => {
  const result = await brandSchema.safeParseAsync(brand)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialBrand = async (brand: any): Promise<Partial<Brand>> => {
  const result = brandSchema.partial().safeParse(brand)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}
