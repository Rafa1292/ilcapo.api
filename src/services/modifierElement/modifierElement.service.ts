import { ModifierElement, NewModifierElement } from './modifierElement.types'
import { ModifierElementModel } from '../../db/models/modifierElement.model'
import { toNewModifierElement } from '../../factories/modifierElement.factory'

export const getModifierElements = async (): Promise<ModifierElement[]> => {
  return await ModifierElementModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'modifierElementUpgrade'
        }
      ]
    }
  )
}

export const getModifierElementsWithDeletedItems = async (modifierGroupId: number): Promise<ModifierElement[]> => {
  const modifierelements = await ModifierElementModel.findAll()
  return modifierelements.filter((modifierElement) => modifierElement.modifierGroupId === modifierGroupId)
}

export const getModifierElementById = async (id: number): Promise<ModifierElement> => {
  const response = await ModifierElementModel.findByPk(id, {
    include: [
      'modifierElementUpgrade', 'productReference'
    ]
  }
  )
  if (response === null) throw new Error('ModifierElement not found')
  return await toNewModifierElement(response)
}

export const saveModifierElement = async (modifierElement: NewModifierElement): Promise<ModifierElement> => {
  return await ModifierElementModel.create(modifierElement)
}

export const updateModifierElement = async (modifierElement: Partial<ModifierElement>, id: number): Promise<void> => {
  await ModifierElementModel.update(modifierElement, { where: { id } })
}

export const deleteModifierElement = async (id: number): Promise<void> => {
  await updateModifierElement({ delete: true }, id)
}

export const recoveryModifierElement = async (id: number): Promise<void> => {
  const modifierElement = await getModifierElementById(id)
  modifierElement.delete = false
  await updateModifierElement(modifierElement, id)
}
