import { ModifierElement, NewModifierElement } from './modifierElement.types'
import { ModifierElementModel } from '../../db/models/modifierElement.model'
import { toNewModifierElement } from '../../factories/modifierElement.factory'

export const getModifierElements = async (): Promise<ModifierElement[]> => {
  return await ModifierElementModel.findAll(
    {
      where: {
        delete: false
      }
    }
  )
}

export const getModifierElementsWithDeletedItems = async (): Promise<ModifierElement[]> => {
  return await ModifierElementModel.findAll()
}

export const getModifierElementById = async (id: number): Promise<ModifierElement> => {
  const response = await ModifierElementModel.findByPk(id)
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
  const modifierElement = await getModifierElementById(id)
  modifierElement.delete = true
  await updateModifierElement(modifierElement, id)
}

export const recoveryModifierElement = async (id: number): Promise<void> => {
  const modifierElement = await getModifierElementById(id)
  modifierElement.delete = false
  await updateModifierElement(modifierElement, id)
}
