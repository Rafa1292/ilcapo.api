
export interface UpgradeElementPriceAttributes {
    id: number
    upgradeId: number
    menuId: number
    price: number
    delete: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: number
    updatedBy?: number
  }
  
  export interface UpgradeElementPrice extends Required<UpgradeElementPriceAttributes> { }
  
  export interface NewUpgradeElementPrice extends Omit<UpgradeElementPriceAttributes, 'id'> { }
  