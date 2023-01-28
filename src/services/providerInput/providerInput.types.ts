export interface ProviderInputAttributes {
  id: number
  inputModelId: number
  providerModelId: number
  lowerPrice: number
  upperPrice: number
  currentPrice: number
  lastPrice: number
  expectedPrice: number
  presentation: number
  measureId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ProviderInput extends Required<ProviderInputAttributes> { }
