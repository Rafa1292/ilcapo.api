
export interface ElementPriceAttributes {
    id: number
    elementId: number
    menuId: number
    price: number
    delete: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: number
    updatedBy?: number
  }
  
  export interface ElementPrice extends Required<ElementPriceAttributes> { }
  
  export interface NewElementPrice extends Omit<ElementPriceAttributes, 'id'> { }
  