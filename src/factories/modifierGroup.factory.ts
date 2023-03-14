import { GroupElement } from '../services/groupElement/groupElement.types'
import { ModifierGroup } from '../services/modifierGroup/modifierGroup.types'
import * as modifierGroupValidator from '../validations/modifierGroup.validator'

export const toNewModifierGroup = async (modifierGroup: any): Promise<ModifierGroup> => {
  await modifierGroupValidator.newModifierGroupIsValid(modifierGroup)
  return {
    id: modifierGroup.id,
    name: modifierGroup.name,
    minSelectable: modifierGroup.minSelectable,
    maxSelectable: modifierGroup.maxSelectable,
    isRequired: modifierGroup.isRequired,
    label: modifierGroup.label,
    elements: modifierGroup.elements.filter((element: GroupElement) => !element.modifierElement.delete),
    createdBy: modifierGroup.createdBy,
    updatedBy: modifierGroup.updatedBy,
    createdAt: modifierGroup.createdAt,
    updatedAt: modifierGroup.updatedAt,
    delete: modifierGroup.delete
  }
}

export const toNewModifierGroups = async (modifierGroups: any[]): Promise<ModifierGroup[]> => {
  return await Promise.all(modifierGroups.map(async (modifierGroup: any) => await toNewModifierGroup(modifierGroup)))
}
