import { ModifierGroup, NewModifierGroup } from './modifierGroup.types'
import { ModifierGroupModel } from '../../db/models/modifierGroup.model'
import { validateModifierGroup, validateModifierGroups } from '../../factories/modifierGroup.factory'
import { getNow } from '../../utils/timeManager'

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
            'productReference', 'prices',
            {
              association: 'modifierUpgrade',
              include: [
                'prices'
              ]
            }
          ]
        }
      ]
    }
  )
  return await validateModifierGroups(modifierGroups)
}

export const getModifierGroupsWithDeletedItems = async (): Promise<ModifierGroup[]> => {
  return await ModifierGroupModel.findAll()
}

export const getModifierGroupById = async (id: number): Promise<ModifierGroup> => {
  const response = await ModifierGroupModel.findByPk(id,
    {
      include: [
        {
          association: 'elements',
          include: [
            {
              association: 'modifierUpgrade'
            },
            {
              association: 'productReference'
            }
          ]
        }
      ]
    })
  if (response === null) throw new Error('ModifierGroup not found')
  if (response.delete) throw new Error('ModifierGroup deleted')
  return await validateModifierGroup(response)
}

export const saveModifierGroup = async (modifierGroup: NewModifierGroup): Promise<ModifierGroup> => {
  const now = getNow()
  modifierGroup.createdAt = now
  modifierGroup.updatedAt = now
  return await ModifierGroupModel.create(modifierGroup)
}

export const updateModifierGroup = async (modifierGroup: Partial<ModifierGroup>, id: number): Promise<void> => {
  const now = getNow()
  modifierGroup.updatedAt = now
  await ModifierGroupModel.update(modifierGroup, { where: { id } })
}

export const deleteModifierGroup = async (id: number): Promise<void> => {
  const modifierGroup = await getModifierGroupById(id)
  const now = getNow()
  modifierGroup.updatedAt = now
  modifierGroup.delete = true
  await updateModifierGroup(modifierGroup, id)
}

export const recoveryModifierGroup = async (id: number): Promise<void> => {
  const modifierGroup = await getModifierGroupById(id)
  const now = getNow()
  modifierGroup.updatedAt = now
  modifierGroup.delete = false
  await updateModifierGroup(modifierGroup, id)
}
