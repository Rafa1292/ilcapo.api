import { ModifierGroup, ModifierGroupAttributes } from './modifierGroup.types'
import { ModifierGroupModel } from '../../db/models/modifierGroup.model'

export const getModifierGroups = async (): Promise<ModifierGroup[]> => {
  return await ModifierGroupModel.findAll(
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
}

export const getModifierGroupsWithDeletedItems = async (): Promise<ModifierGroup[]> => {
  return await ModifierGroupModel.findAll()
}

export const getModifierGroupById = async (id: number): Promise<ModifierGroup> => {
  const modifierGroup = await ModifierGroupModel.findByPk(id,
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
  if (modifierGroup === null) throw new Error('ModifierGroup not found')
  if (modifierGroup.delete) throw new Error('ModifierGroup deleted')
  return modifierGroup
}

export const getModifierGroupByName = async (name: string, id: number): Promise<ModifierGroup | undefined> => {
  const objs = await ModifierGroupModel.findAll({})
  const obj = objs.find((tmp: ModifierGroup) => {
    return tmp.name.toLowerCase() === name.toLowerCase() && tmp.id !== id
  })
  return obj
}


export const saveModifierGroup = async (modifierGroup: ModifierGroup): Promise<ModifierGroup> => {
  const {id, ...rest } = ModifierGroupModel.getModifierGroup(modifierGroup, 0)
  return await ModifierGroupModel.create(rest)
}

export const updateModifierGroup = async (modifierGroup: Partial<ModifierGroupAttributes>, id: number): Promise<void> => {
  const updateModifierGroup = ModifierGroupModel.getPartialModifierGroup(modifierGroup, id)
  await ModifierGroupModel.update(updateModifierGroup, { where: { id } })
}

export const deleteModifierGroup = async (id: number): Promise<void> => {
  await updateModifierGroup({ delete: true }, id)
}

export const recoveryModifierGroup = async (id: number): Promise<void> => {
  await updateModifierGroup({ delete: false }, id)
}
