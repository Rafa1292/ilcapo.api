export interface MagnitudeAttributes {
  id: number
  name: string
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Magnitude extends Required<MagnitudeAttributes> { }

export interface NewMagnitude extends Omit<MagnitudeAttributes, 'id'> {}
