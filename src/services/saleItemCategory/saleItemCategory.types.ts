export interface SaleItemCategoryAttributes {
  id: number
  name: string
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface SaleItemCategory extends Required<SaleItemCategoryAttributes> { }

export interface NewSaleItemCategory extends Omit<SaleItemCategoryAttributes, 'id'> { }
