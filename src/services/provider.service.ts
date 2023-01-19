import providerData from '../provider.json'
import { Provider, ProviderVM, mapToProviderVM, mapToProvidersVM, mapToProvider } from './types'
import ProviderModel from '../db/models/provider.model'
import { toNewProvider } from '../factories/provider.factory'
const providers: Provider[] = providerData as Provider[]

export const getProviders = (): Provider[] => providers

export const getProviderById = async (id: number): Promise<ProviderVM | undefined> => {
  const response = await ProviderModel.findByPk(id)
  const provider = toNewProvider(response)
  if (provider !== undefined) {
    return mapToProviderVM(provider)
  }
  return undefined
}

export const getProvidersVM = (): ProviderVM[] => mapToProvidersVM(providers)

export const saveProvider = (provider: ProviderVM): ProviderVM => {
  providers.push(mapToProvider(provider))
  return provider
}
