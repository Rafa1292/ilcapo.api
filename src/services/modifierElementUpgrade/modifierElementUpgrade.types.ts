import { traceFields } from "../../utils/genericTypes/traceFields.type"
import { UpgradeElementPrice } from "../upgradeElementPrice/upgradeElementPrice.types"

export interface ModifierElementUpgradeAttributes {
  id: number
  label: string
  prices: UpgradeElementPrice[]
  modifierElementId: number
  newModifierGroupId: number
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

export interface ModifierElementUpgrade extends Omit<ModifierElementUpgradeAttributes, keyof typeof traceFields> { }
