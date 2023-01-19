export interface ProviderAttributes {
  id: number
  name: string
  phone: number
  fixedExpense: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Provider extends Required<ProviderAttributes> {}

export interface ProviderVM extends Required<ProviderAttributes> {}

export const mapToProviderVM = (provider: Provider): ProviderVM => {
  const { ...rest } = provider
  console.log(provider)
  return rest
}

export const mapToProvider = (provider: ProviderVM): Provider => {
  return { ...provider, id: Math.floor(Math.random() * 1000) }
}
export const mapToProvidersVM = (providers: Provider[]): ProviderVM[] => {
  return providers.map(mapToProviderVM)
}
