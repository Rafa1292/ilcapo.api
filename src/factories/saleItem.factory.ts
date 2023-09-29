import { z } from 'zod'
import { SaleItem } from '../services/saleItem/saleItem.types'
import { saleItemProductSchema } from './saleItemProduct.factory'
import { itemPriceSchema } from './itemPrice.factory'
import { getSaleItemByName } from '../services/saleItem/saleItem.service'

export const saleItemSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
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
  saleItemProducts: z.union([z.array(saleItemProductSchema), z.undefined()]),
  prices: z.array(itemPriceSchema)
})

export const validateSaleItem = async (saleItem: SaleItem): Promise<SaleItem> => {
  const result = await saleItemSchema.safeParseAsync(saleItem)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  await validateName(result.data.name, result.data.id)
  return result.data
}

export const validatePartialSaleItem = async (saleItem: any): Promise<Partial<SaleItem>> => {
  const result = await saleItemSchema.partial().safeParseAsync(saleItem)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateSaleItems = async (saleItems: any[]): Promise<SaleItem[]> => {
  return await Promise.all(saleItems.map(async (saleItem) => await validateSaleItem(saleItem)))
}

const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getSaleItemByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}
