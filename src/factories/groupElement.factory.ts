import { GroupElement } from '../services/groupElement/groupElement.types'

export const toNewGroupElement = async (groupElement: any): Promise<GroupElement> => {
  return {
    id: groupElement.id,
    modifierGroupId: groupElement.modifierGroupId,
    modifierElementId: groupElement.modifierElementId,
    modifierElement: groupElement.modifierElement,
    createdBy: groupElement.createdBy,
    updatedBy: groupElement.updatedBy,
    createdAt: groupElement.createdAt,
    updatedAt: groupElement.updatedAt,
    delete: groupElement.delete
  }
}
