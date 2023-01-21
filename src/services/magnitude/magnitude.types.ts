export interface MagnitudeAttributes {
  id: number
  name: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Magnitude extends Required<MagnitudeAttributes> { }
