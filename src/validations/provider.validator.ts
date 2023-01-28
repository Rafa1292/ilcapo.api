import { getProviders } from '../services/provider/provider.service'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const providers = await getProviders()
  const provider = providers.find((provider) => provider.name.toLowerCase() === name.toLowerCase())
  if (provider !== null && provider?.id !== id) {
    throw new Error('Este nombre de proveedor ya existe')
  }
}

export const newProviderIsValid = async (provider: any): Promise<boolean> => {
  parseName(provider?.name)
  await validateUniqueName(provider?.name, provider?.id)
  return true
}
