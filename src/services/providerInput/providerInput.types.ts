import { traceFields } from '../../utils/genericTypes/traceFields.type'
import { Brand } from '../brand/brand.types'
import { Input } from '../input/input.types'
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
  input?: Input
  measure?: Measure
  brand?: Brand
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

export interface ProviderInput extends Omit<ProviderInputAttributes, keyof typeof traceFields> { }
