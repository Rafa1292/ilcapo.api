import { getBrandByName } from '../services/brand/brand.service'
import { Brand } from '../services/brand/brand.types'
import { z } from 'zod'

export const brandSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
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
  
  await validateName(result.data.name, result.data.id)

  return result.data
}

export const validatePartialBrand = async (brand: any): Promise<Partial<Brand>> => {
  const result = brandSchema.partial().safeParse(brand)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateBrands = async (brands: any[]): Promise<Brand[]> => {
  return await Promise.all(brands.map(async (brand: any) => await validateBrand(brand)))
}

const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getBrandByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}
