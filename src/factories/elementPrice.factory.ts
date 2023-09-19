import { ElementPrice } from "../services/elementPrice/elementPrice.types";
import { z } from 'zod'

const elementPriceSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  menuId: z.number({
    required_error: 'El id del menu es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  elementId: z.number({
    required_error: 'El id del elemento es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  price: z.number({
    required_error: 'El precio es requerido',
    invalid_type_error: 'El precio debe ser un numero entero',
  }),
})

export const validateElementPrice = async (elementPrice: any): Promise<ElementPrice> => {
  const result = await elementPriceSchema.safeParseAsync(elementPrice)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
};

export const validatePartialElementPrice = async (elementPrice: any): Promise<Partial<ElementPrice>> => {
  const result = await elementPriceSchema.partial().safeParseAsync(elementPrice)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateElementPrices = async (elements: any[]): Promise<ElementPrice[]> => {
  return await Promise.all(
    elements.map(async (element) => {
      return await validateElementPrice(element);
    })
  );
};
