import { z } from 'zod'
import { SaleItemCategory } from '../services/saleItemCategory/saleItemCategory.types'
import { saleItemSchema } from './saleItem.factory'
import { getSaleItemCategoryByName } from '../services/saleItemCategory/saleItemCategory.service'

const saleItemCategorySchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un texto',
  }),
  saleItems: z.union([z.array(saleItemSchema), z.undefined()])
})

export const validateSaleItemCategory = async (saleItemCategory: any): Promise<SaleItemCategory> => {
  const result = await saleItemCategorySchema.safeParseAsync(saleItemCategory)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  await validateName(result.data.name, result.data.id)

  return result.data
}

export const validatePartialSaleItemCategory = async (saleItemCategory: any): Promise<Partial<SaleItemCategory>> => {
  const result = await saleItemCategorySchema.partial().safeParseAsync(saleItemCategory)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateSaleItemCategories = async (saleItemCategories: any[]): Promise<SaleItemCategory[]> => {
  return await Promise.all(saleItemCategories.map(async (saleItemCategory: any) => await validateSaleItemCategory(saleItemCategory)))
}

const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getSaleItemCategoryByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}
