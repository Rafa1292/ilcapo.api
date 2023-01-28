import { Provider } from '../services/provider/provider.types'
import * as providerValidator from '../validations/provider.validator'

export const toNewProvider = async (provider: any): Promise<Provider> => {
  await providerValidator.newProviderIsValid(provider)

  return {
    id: provider.id,
    name: provider.name,
    phone: provider.phone,
    fixedExpense: provider.fixedExpense,
    createdBy: provider.createdBy,
    updatedBy: provider.updatedBy,
    createdAt: provider.createdAt,
    updatedAt: provider.updatedAt
  }
}
