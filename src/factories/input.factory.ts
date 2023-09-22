import { z } from 'zod'
import { Input } from '../services/input/input.types'
import * as inputValidator from '../validations/input.validator'

export const inputSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre de la marca es requerido',
    invalid_type_error: 'El nombre de la marca debe ser  un texto',
  }),
  measureId: z.number({
    required_error: 'La medida es requerida',
    invalid_type_error: 'La medida debe ser un numero entero',
  }),
  lowerPrice: z.number({
    required_error: 'El precio minimo es requerido',
    invalid_type_error: 'El precio minimo debe ser un numero entero',
  }),
  upperPrice: z.number({
    required_error: 'El precio maximo es requerido',
    invalid_type_error: 'El precio maximo debe ser un numero entero',
  }),
  currentPrice: z.number({
    required_error: 'El precio actual es requerido',
    invalid_type_error: 'El precio actual debe ser un numero entero',
  }),
  lastPrice: z.number({
    required_error: 'El ultimo precio es requerido',
    invalid_type_error: 'El ultimo precio debe ser un numero entero',
  }),
  expectedPrice: z.number({
    required_error: 'El precio esperado es requerido',
    invalid_type_error: 'El precio esperado debe ser un numero entero',
  }),
  stock: z.number({
    required_error: 'El stock es requerido',
    invalid_type_error: 'El stock debe ser un numero entero',
  }),
  presentation: z.number({
    required_error: 'La presentacion es requerida',
    invalid_type_error: 'La presentacion debe ser un texto',
  }),
  suggestedStock: z.number({
    required_error: 'El stock sugerido es requerido',
    invalid_type_error: 'El stock sugerido debe ser un numero entero',
  }),
  currentProviderId: z.number({
    required_error: 'El proveedor actual es requerido',
    invalid_type_error: 'El proveedor actual debe ser un numero entero',
  }),
  inputCategoryId: z.number({
    required_error: 'La categoria de insumo es requerida',
    invalid_type_error: 'La categoria de insumo debe ser un numero entero',
  })
})

export const validateInput = async (input: any): Promise<Input> => {
  const result = await inputSchema.safeParseAsync(input)
  await inputValidator.newInputIsValid(input)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialInput = async (input: any): Promise<Partial<Input>> => {
  const result = await inputSchema.partial().safeParseAsync(input)
  await inputValidator.newInputIsValid(input)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}


export const validateInputs = async (inputs: any[]): Promise<Input[]> => {
  return await Promise.all(inputs.map(async (input: any) => {
    return await validateInput(input)
  }))
}
