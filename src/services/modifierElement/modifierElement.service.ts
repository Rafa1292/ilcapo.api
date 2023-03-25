import { ModifierElement, NewModifierElement } from './modifierElement.types'
import { ModifierElementModel } from '../../db/models/modifierElement.model'
import { toNewModifierElement } from '../../factories/modifierElement.factory'
import { getElementsByModifierGroupId } from '../groupElement/groupElement.service'

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
  const groupElements = await getElementsByModifierGroupId(modifierGroupId)
  const elements = await ModifierElementModel.findAll()

  return elements.filter(element => groupElements.some(groupElement => groupElement.modifierElementId === element.id))
}

export const getModifierElementById = async (id: number): Promise<ModifierElement> => {
  const response = await ModifierElementModel.findByPk(id, {
    include: [
      {
        association: 'modifierElementUpgrade'
      }
    ]
  }
  )
  if (response === null) throw new Error('ModifierElement not found')
  return await toNewModifierElement(response, 0)
}

export const saveModifierElement = async (modifierElement: NewModifierElement): Promise<ModifierElement> => {
  return await ModifierElementModel.create(modifierElement)
}

export const updateModifierElement = async (modifierElement: Partial<ModifierElement>, id: number): Promise<void> => {
  await ModifierElementModel.update(modifierElement, { where: { id } })
}

export const deleteModifierElement = async (id: number): Promise<void> => {
  const modifierElement = await getModifierElementById(id)
  modifierElement.delete = true
  await updateModifierElement(modifierElement, id)
}

export const recoveryModifierElement = async (id: number): Promise<void> => {
  const modifierElement = await getModifierElementById(id)
  modifierElement.delete = false
  await updateModifierElement(modifierElement, id)
}
