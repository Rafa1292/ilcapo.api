export interface ProviderInputAttributes {
  id: number
  inputId: number
  providerId: number
  lowerPrice: number
  upperPrice: number
  currentPrice: number
  lastPrice: number
  expectedPrice: number
  presentation: number
  measureId: number
  brandId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ProviderInput extends Required<ProviderInputAttributes> { }

export interface NewProviderInput extends Omit<ProviderInputAttributes, 'id'> { }
