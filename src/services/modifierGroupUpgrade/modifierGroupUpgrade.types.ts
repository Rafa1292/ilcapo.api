
export interface ModifierGroupUpgradeAttributes {
  id: number
  label: string
  modifierGroupId: number
  newModifierGroupId: number
  price: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ModifierGroupUpgrade extends Required<ModifierGroupUpgradeAttributes> { }

export interface NewModifierGroupUpgrade extends Omit<ModifierGroupUpgradeAttributes, 'id'> { }
