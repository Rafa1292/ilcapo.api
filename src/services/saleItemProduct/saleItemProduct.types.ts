export interface SaleItemProductAttributes {
  id: number
  saleItemId: number
  productId: number
  quantity: number
  discount: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface SaleItemProduct extends Required<SaleItemProductAttributes> { }

export interface NewSaleItemProduct extends Omit<SaleItemProductAttributes, 'id'> { }
