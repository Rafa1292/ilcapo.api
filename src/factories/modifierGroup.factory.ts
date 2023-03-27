import { GroupElement } from '../services/groupElement/groupElement.types'
import { ModifierGroup } from '../services/modifierGroup/modifierGroup.types'
import * as modifierGroupValidator from '../validations/modifierGroup.validator'
import { toNewGroupElements } from './groupElement.factory'

export const toNewModifierGroup = async (modifierGroup: any): Promise<ModifierGroup> => {
  await modifierGroupValidator.newModifierGroupIsValid(modifierGroup)

  const tempGroupElements = modifierGroup.elements.filter((element: GroupElement) => !element.modifierElement.delete)
  return {
    id: modifierGroup.id,
    name: modifierGroup.name,
    minSelectable: modifierGroup.minSelectable,
    maxSelectable: modifierGroup.maxSelectable,
    isRequired: modifierGroup.isRequired,
    label: modifierGroup.label,
    elements: await toNewGroupElements(tempGroupElements),
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
