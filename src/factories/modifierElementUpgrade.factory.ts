import { ModifierElementUpgrade } from '../services/modifierElementUpgrade/modifierElementUpgrade.types'

export const toNewModifierElementUpgrade = async (modifierElement: any): Promise<ModifierElementUpgrade> => {
  return {
    id: modifierElement.id,
    modifierElementId: modifierElement.modifierGroupId,
    newModifierGroupId: modifierElement.newModifierGroupId,
    label: modifierElement.label,
    prices: modifierElement.prices,
    createdBy: modifierElement.createdBy,
    updatedBy: modifierElement.updatedBy,
    createdAt: modifierElement.createdAt,
    updatedAt: modifierElement.updatedAt
  }
}
