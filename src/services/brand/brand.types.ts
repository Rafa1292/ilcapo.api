export interface BrandAttributes {
  id: number
  name: string
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface Brand extends Required<BrandAttributes> { }

export interface NewBrand extends Omit<BrandAttributes, 'id'> { }
