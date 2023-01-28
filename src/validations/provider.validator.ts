import { getProvidersWithDeletedItems } from '../services/provider/provider.service'
import { Provider } from '../services/provider/provider.types'
import * as validator from '../utils/genericValidators/validator.util'

const parseName = (name: any): string => {
  if (!validator.isString(name)) {
    throw new Error('Incorrect or missing name:')
  }
  return name
}

const maxLenght = (text: string, max: number): string => {
  if (text.length > max) {
    throw new Error(`Phone number needs ${max} digits`)
  }
  return text
}

const validateUniqueName = async (name: string, id: number): Promise<void> => {
  const providers = await getProvidersWithDeletedItems()
  const provider = providers.find((provider) => provider.name.toLowerCase() === name.toLowerCase())
  if (provider !== null && provider !== undefined) {
    if (provider.id !== id) {
      if (provider.delete) {
        throw new Error('Este nombre ya existe y  fue borrado. Si desea recuperarlo dirigase a la sección de proveedores borrados')
      }
      throw new Error('Este nombre de proveedor ya existe')
    }
  }
}

export const newProviderIsValid = async (provider: Provider): Promise<boolean> => {
  parseName(provider?.name)
  maxLenght(provider?.phone.toString(), 8)
  await validateUniqueName(provider?.name, provider?.id)
  return true
}
