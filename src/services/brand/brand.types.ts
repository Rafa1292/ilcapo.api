export interface BrandAttributes {
  id: number
  name: string
  delete: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: number
  updatedBy: number
}

export interface Brand
  extends Omit<
    BrandAttributes,
    'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy' | 'delete'
  > {}
