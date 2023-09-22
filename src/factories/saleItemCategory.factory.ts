import { z } from 'zod'
import { SaleItemCategory } from '../services/saleItemCategory/saleItemCategory.types'
import * as saleItemCategoryValidator from '../validations/saleItemCategory.validator'
import { saleItemSchema } from './saleItem.factory'

const saleItemCategorySchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un texto',
  }),
  saleItems: z.array(saleItemSchema),
})

export const validateSaleItemCategory = async (saleItemCategory: any): Promise<SaleItemCategory> => {
  const result = await saleItemCategorySchema.safeParseAsync(saleItemCategory)
  await saleItemCategoryValidator.newSaleItemCategoryIsValid(saleItemCategory)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialSaleItemCategory = async (saleItemCategory: any): Promise<Partial<SaleItemCategory>> => {
  const result = await saleItemCategorySchema.partial().safeParseAsync(saleItemCategory)
  await saleItemCategoryValidator.newSaleItemCategoryIsValid(saleItemCategory)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateSaleItemCategories = async (saleItemCategories: any[]): Promise<SaleItemCategory[]> => {
  return await Promise.all(saleItemCategories.map(async (saleItemCategory: any) => await validateSaleItemCategory(saleItemCategory)))
}
