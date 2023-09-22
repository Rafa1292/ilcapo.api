import { z } from 'zod'
import { Provider } from '../services/provider/provider.types'
import * as providerValidator from '../validations/provider.validator'

export const providerSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un texto',
  }),
  phone: z.number({
    required_error: 'El telefono es requerido',
    invalid_type_error: 'El telefono debe ser un texto',
  }),
  fixedExpense: z.boolean({
    required_error: 'El gasto fijo es requerido',
    invalid_type_error: 'El gasto fijo debe ser un numero',
  })
})

export const validateProvider = async (provider: any): Promise<Provider> => {
  const result = await providerSchema.safeParseAsync(provider)
  await providerValidator.newProviderIsValid(provider)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialProvider = async (provider: any): Promise<Partial<Provider>> => {
  const result = await providerSchema.partial().safeParseAsync(provider)
  await providerValidator.newProviderIsValid(provider)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateProviders = async (providers: any[]): Promise<Provider[]> => {
  return await Promise.all(providers.map(async (provider: any) => await validateProvider(provider)))
}
