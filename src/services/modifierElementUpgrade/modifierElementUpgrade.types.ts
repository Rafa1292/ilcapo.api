
export interface ModifierElementUpgradeAttributes {
  id: number
  label: string
  modifierElementId: number
  newModifierGroupId: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}

export interface ModifierElementUpgrade extends Required<ModifierElementUpgradeAttributes> { }

export interface NewModifierElementUpgrade extends Omit<ModifierElementUpgradeAttributes, 'id'> { }
