import { GroupElementModel } from '../../db/models/groupElement.model'
import { GroupElement, NewGroupElement } from './groupElement.types'

export const saveGroupElement = async (groupElement: NewGroupElement): Promise<GroupElement> => {
  return await GroupElementModel.create(groupElement)
}

export const updateGroupElement = async (groupElement: Partial<GroupElement>, id: number): Promise<void> => {
  await GroupElementModel.update(groupElement, { where: { id } })
}

export const deleteGroupElement = async (id: number): Promise<void> => {
  await GroupElementModel.destroy({ where: { id } })
}

export const saveGroupElements = async (groupElements: GroupElement[], modifierGroupId: number): Promise<void> => {
  for (const groupElement of groupElements) {
    const { id, ...rest } = groupElement
    await saveGroupElement({ ...rest, modifierGroupId })
  }
}

export const getElementsByModifierGroupId = async (modifierGroupId: number): Promise<GroupElement[]> => {
  const elements = await GroupElementModel.findAll({ where: { modifierGroupId } })
  return elements
}
