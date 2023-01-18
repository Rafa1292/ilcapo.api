import { Provider } from '../services/types'
import * as providerValidator from '../validations/provider.validator'

export const toNewProvider = (provider: any): Provider => {
  providerValidator.newProviderIsValid(provider)

  return {
    id: provider.id,
    name: provider.name,
    phone: provider.phone,
    fixedExpense: provider.fixedExpense
  }
}
