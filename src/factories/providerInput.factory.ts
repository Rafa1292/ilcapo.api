import { z } from 'zod'
import { ProviderInput } from '../services/providerInput/providerInput.types'
import { providerSchema } from './provider.factory'
import { measureSchema } from './measure.factory'
import { brandSchema } from './brand.factory'
import { inputSchema } from './input.factory'

const providerInputSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  measureId: z.number({
    required_error: 'La medida es requerida',
    invalid_type_error: 'La medida debe ser un numero entero',
  }),
  lowerPrice: z.number({
    required_error: 'El precio inferior es requerido',
    invalid_type_error: 'El precio inferior debe ser un numero',
  }),
  upperPrice: z.number({
    required_error: 'El precio superior es requerido',
    invalid_type_error: 'El precio superior debe ser un numero',
  }),
  currentPrice: z.number({
    required_error: 'El precio actual es requerido',
    invalid_type_error: 'El precio actual debe ser un numero',
  }),
  lastPrice: z.number({
    required_error: 'El precio anterior es requerido',
    invalid_type_error: 'El precio anterior debe ser un numero',
  }),
  expectedPrice: z.number({
    required_error: 'El precio esperado es requerido',
    invalid_type_error: 'El precio esperado debe ser un numero',
  }),
  presentation: z.number({
    required_error: 'La presentacion es requerida',
    invalid_type_error: 'La presentacion debe ser un texto',
  }),
  inputId: z.number({
    required_error: 'El insumo es requerido',
    invalid_type_error: 'El insumo debe ser un numero entero',
  }),
  providerId: z.number({
    required_error: 'El proveedor es requerido',
    invalid_type_error: 'El proveedor debe ser un numero entero',
  }),
  brandId: z.number({
    required_error: 'La marca es requerida',
    invalid_type_error: 'La marca debe ser un numero entero',
  }),
  provider: z.union([providerSchema, z.undefined()]),
  measure: z.union([measureSchema, z.undefined()]),
  brand: z.union([brandSchema, z.undefined()]),
  input: z.union([inputSchema, z.undefined()])
})

export const validateProviderInput = async (providerInput: any): Promise<ProviderInput> => {
  const result = await providerInputSchema.safeParseAsync(providerInput)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialProviderInput = async (providerInput: any): Promise<Partial<ProviderInput>> => {
  const result = await providerInputSchema.partial().safeParseAsync(providerInput)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateProviderInputs = async (providerInputs: any[]): Promise<ProviderInput[]> => {
  return await Promise.all(providerInputs.map(async (providerInput: any) => {
    return await validateProviderInput(providerInput)
  }))
}
