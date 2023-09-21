import { traceFields } from "../../utils/genericTypes/traceFields.type"

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
    
  export interface UpgradeElementPrice extends Omit<UpgradeElementPriceAttributes, keyof typeof traceFields> { }
  