import { traceFields } from '../../utils/genericTypes/traceFields.type'
import { Measure } from '../measure/measure.types'

export interface MagnitudeAttributes {
  id: number
  name: string
  measures?: Measure[]
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}


export interface Magnitude extends Omit<MagnitudeAttributes, keyof typeof traceFields> {}
