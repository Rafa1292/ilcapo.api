export interface Provider {
  id: number
  name: string
  phone: number
  fixedExpense: boolean
}

// export type ProviderVM = Pick<Provider, 'id' | 'name' | 'fixedExpense'>
export type ProviderVM = Omit<Provider, 'id'>

export const mapToProviderVM = (provider: Provider): ProviderVM => {
  const { id, ...rest } = provider
  return rest
}

export const mapToProvider = (provider: ProviderVM): Provider => {
  return { ...provider, id: Math.floor(Math.random() * 1000) }
}
export const mapToProvidersVM = (providers: Provider[]): ProviderVM[] => {
  return providers.map(mapToProviderVM)
}
