import { Brand } from '../brand/brand.types'
import { Measure } from '../measure/measure.types'
import { Provider } from '../provider/provider.types'

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
  provider?: Provider
  measure?: Measure
  brand?: Brand
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ProviderInput extends Required<ProviderInputAttributes> { }

export interface NewProviderInput extends Omit<ProviderInputAttributes, 'id'> { }
