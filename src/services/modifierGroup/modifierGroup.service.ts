import { ModifierGroup, NewModifierGroup } from './modifierGroup.types'
import { ModifierGroupModel } from '../../db/models/modifierGroup.model'
import { toNewModifierGroup, toNewModifierGroups } from '../../factories/modifierGroup.factory'

export const getModifierGroups = async (): Promise<ModifierGroup[]> => {
  const modifierGroups: ModifierGroupModel[] = await ModifierGroupModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'elements',
          include: [
            'modifierElementUpgrade', 'productReference'
          ]
        }
      ]
    }
  )

  return await toNewModifierGroups(modifierGroups)
}

export const getModifierGroupsWithDeletedItems = async (): Promise<ModifierGroup[]> => {
  return await ModifierGroupModel.findAll()
}

export const getModifierGroupById = async (id: number): Promise<ModifierGroup> => {
  const response = await ModifierGroupModel.findByPk(id)
  if (response === null) throw new Error('ModifierGroup not found')
  if (response.delete) throw new Error('ModifierGroup deleted')
  return await toNewModifierGroup(response)
}

export const saveModifierGroup = async (modifierGroup: NewModifierGroup): Promise<ModifierGroup> => {
  return await ModifierGroupModel.create(modifierGroup)
}

export const updateModifierGroup = async (modifierGroup: Partial<ModifierGroup>, id: number): Promise<void> => {
  await ModifierGroupModel.update(modifierGroup, { where: { id } })
}

export const deleteModifierGroup = async (id: number): Promise<void> => {
  const modifierGroup = await getModifierGroupById(id)
  modifierGroup.delete = true
  await updateModifierGroup(modifierGroup, id)
}

export const recoveryModifierGroup = async (id: number): Promise<void> => {
  const modifierGroup = await getModifierGroupById(id)
  modifierGroup.delete = false
  await updateModifierGroup(modifierGroup, id)
}
