import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface MeasureAttributes {
  id: number
  name: string
  principalMeasure: boolean
  value: number
  magnitudeId: number
  abbreviation: string
  delete: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}


export interface Measure extends Omit<MeasureAttributes, keyof typeof traceFields> { }
