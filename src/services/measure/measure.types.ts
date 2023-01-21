export interface MeasureAttributes {
  id: number
  name: string
  principalMeasure: boolean
  value: number
  magnitudeId: number
  abbreviation: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Measure extends Required<MeasureAttributes> { }
