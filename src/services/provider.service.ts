import providerData from '../provider.json'
import { Provider, ProviderVM, mapToProviderVM, mapToProvidersVM, mapToProvider } from './types'

const providers: Provider[] = providerData as Provider[]

export const getProviders = (): Provider[] => providers

export const getProviderById = (id: number): ProviderVM | undefined => {
  const provider = providers.find(p => p.id === id)
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
