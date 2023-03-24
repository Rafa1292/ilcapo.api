import { ModifierGroupUpgrade } from '../services/modifierGroupUpgrade/modifierGroupUpgrade.types'

export const toNewModifierGroupUpgrade = async (modifierGroup: any): Promise<ModifierGroupUpgrade> => {
  return {
    id: modifierGroup.id,
    modifierGroupId: modifierGroup.modifierGroupId,
    newModifierGroupId: modifierGroup.newModifierGroupId,
    label: modifierGroup.label,
    price: modifierGroup.price,
    createdBy: modifierGroup.createdBy,
    updatedBy: modifierGroup.updatedBy,
    createdAt: modifierGroup.createdAt,
    updatedAt: modifierGroup.updatedAt
  }
}
