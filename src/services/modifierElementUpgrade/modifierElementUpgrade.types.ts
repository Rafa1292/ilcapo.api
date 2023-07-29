import { UpgradeElementPrice } from "../upgradeElementPrice/upgradeElementPrice.types"

export interface ModifierElementUpgradeAttributes {
  id: number
  label: string
  prices: UpgradeElementPrice[]
  modifierElementId: number
  newModifierGroupId: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ModifierElementUpgrade extends Required<ModifierElementUpgradeAttributes> { }

export interface NewModifierElementUpgrade extends Omit<ModifierElementUpgradeAttributes, 'id'> { }
