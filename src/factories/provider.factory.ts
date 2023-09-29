import { z } from 'zod'
import { Provider } from '../services/provider/provider.types'
import { getProviderByName } from '../services/provider/provider.service'

export const providerSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
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

  if (!result.success) {
    throw new Error(result.error.message)
  }

  await validateName(result.data.name, result.data.id)

  return result.data
}

export const validatePartialProvider = async (provider: any): Promise<Partial<Provider>> => {
  const result = await providerSchema.partial().safeParseAsync(provider)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateProviders = async (providers: any[]): Promise<Provider[]> => {
  return await Promise.all(providers.map(async (provider: any) => await validateProvider(provider)))
}

const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getProviderByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}
