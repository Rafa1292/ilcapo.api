
export interface ItemPriceAttributes {
    id: number
    itemId: number
    menuId: number
    price: number
    delete: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: number
    updatedBy?: number
  }
  
  export interface ItemPrice extends Required<ItemPriceAttributes> { }
  
  export interface NewItemPrice extends Omit<ItemPriceAttributes, 'id'> { }
  