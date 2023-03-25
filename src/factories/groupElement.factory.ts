import { GroupElement } from '../services/groupElement/groupElement.types'
import { getModifierElementById } from '../services/modifierElement/modifierElement.service'

export const toNewGroupElement = async (groupElement: any): Promise<GroupElement> => {
  return {
    id: groupElement.id,
    modifierGroupId: groupElement.modifierGroupId,
    modifierElementId: groupElement.modifierElementId,
    modifierElement: groupElement.modifierElement === undefined || groupElement.modifierElement === null ? groupElement.modifierElement : await getModifierElementById(groupElement.modifierElementId),
    createdBy: groupElement.createdBy,
    updatedBy: groupElement.updatedBy,
    createdAt: groupElement.createdAt,
    updatedAt: groupElement.updatedAt,
    delete: groupElement.delete
  }
}

export const toNewGroupElements = async (groupElements: any[]): Promise<GroupElement[]> => {
  return await Promise.all(groupElements.map(async (groupElement: any) => await toNewGroupElement(groupElement)))
}
