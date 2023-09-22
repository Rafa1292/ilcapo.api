import { z } from 'zod'
import { SaleItem } from '../services/saleItem/saleItem.types'
import * as saleItemValidator from '../validations/saleItem.validator'
import { saleItemProductSchema } from './saleItemProduct.factory'
import { itemPriceSchema } from './itemPrice.factory'

export const saleItemSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un texto',
  }),
  saleItemCategoryId: z.number({
    required_error: 'La categoria de item de venta es requerida',
    invalid_type_error: 'La categoria de item de venta debe ser un numero entero',
  }),
  pictureUrl: z.string({
    required_error: 'La url de la imagen es requerida',
    invalid_type_error: 'La url de la imagen debe ser un texto',
  }),
  saleItemProducts: z.array(saleItemProductSchema),
  prices: z.array(itemPriceSchema),
})

export const validateSaleItem = async (saleItem: SaleItem): Promise<SaleItem> => {
  const result = await saleItemSchema.safeParseAsync(saleItem)
  await saleItemValidator.newSaleItemIsValid(saleItem)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialSaleItem = async (saleItem: any): Promise<Partial<SaleItem>> => {
  const result = await saleItemSchema.partial().safeParseAsync(saleItem)
  await saleItemValidator.newSaleItemIsValid(saleItem)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateSaleItems = async (saleItems: any[]): Promise<SaleItem[]> => {
  return await Promise.all(saleItems.map(async (saleItem) => await validateSaleItem(saleItem)))
}
