import { ModifierElementUpgrade } from './modifierElementUpgrade.types'
import { ModifierElementUpgradeModel } from '../../db/models/modifierElementUpgrade.model'
import { newModifierElementUpgradeIsValid } from '../../validations/modifierElementUpgrade.validator'

export const saveModifierElementUpgrade = async (modifierElementUpgrade: ModifierElementUpgrade): Promise<void> => {
  const isValid = await newModifierElementUpgradeIsValid(modifierElementUpgrade)
  if (isValid) {
    const { id, ...newModifierElementUpgrade } = modifierElementUpgrade
    await ModifierElementUpgradeModel.create(newModifierElementUpgrade)
  }
}

export const updateModifierElementUpgrade = async (modifierElementUpgrade: Partial<ModifierElementUpgrade>, id: number): Promise<void> => {
  await ModifierElementUpgradeModel.update(modifierElementUpgrade, { where: { id } })
}

export const deleteModifierElementUpgradeByModifierElementId = async (modifierElementId: number): Promise<void> => {
  await ModifierElementUpgradeModel.destroy({ where: { modifierElementId } })
}

export const getModifierElementUpgradeByModiifierElementId = async (modifierElementId: number): Promise<ModifierElementUpgrade | null> => {
  const response = await ModifierElementUpgradeModel.findOne({ where: { modifierElementId } })

  return response
}
