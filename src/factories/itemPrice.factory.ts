import { z } from "zod";
import { ItemPrice } from "../services/itemPrice/itemPrice.types";

export const itemPriceSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  itemId: z.number({
    required_error: 'El item es requerido',
    invalid_type_error: 'El item debe ser un numero entero',
  }),
  menuId: z.number({
    required_error: 'El menu es requerido',
    invalid_type_error: 'El menu debe ser un numero entero',
  }),
  price: z.number({
    required_error: 'El precio es requerido',
    invalid_type_error: 'El precio debe ser un numero entero',
  })
})

export const validateItemPrice = async (itemPrice: any): Promise<ItemPrice> => {
  const result = await itemPriceSchema.safeParseAsync(itemPrice)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
};

export const validatePartialItemPrice = async (itemPrice: any): Promise<Partial<ItemPrice>> => {
  const result = await itemPriceSchema.partial().safeParseAsync(itemPrice)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
};

export const validateItemPrices = async (items: any[]): Promise<ItemPrice[]> => {
  return await Promise.all(
    items.map(async (item) => {
      return await validateItemPrice(item);
    })
  );
};
