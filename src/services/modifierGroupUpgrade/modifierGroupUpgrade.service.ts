import { ModifierGroupUpgrade } from './modifierGroupUpgrade.types'
import { ModifierGroupUpgradeModel } from '../../db/models/modifierGroupUpgrade.model'
import { newModifierGroupUpgradeIsValid } from '../../validations/modifierGroupUpgrade.validator'

export const saveModifierGroupUpgrade = async (modifierGroupUpgrade: ModifierGroupUpgrade): Promise<void> => {
  const isValid = await newModifierGroupUpgradeIsValid(modifierGroupUpgrade)
  if (!isValid) {
    const { id, ...newModifierGroupUpgrade } = modifierGroupUpgrade
    await ModifierGroupUpgradeModel.create(newModifierGroupUpgrade)
  }
}

export const updateModifierGroupUpgrade = async (modifierGroupUpgrade: Partial<ModifierGroupUpgrade>, id: number): Promise<void> => {
  await ModifierGroupUpgradeModel.update(modifierGroupUpgrade, { where: { id } })
}

export const deleteModifierGroupUpgradeByModifierGroupId = async (modifierGroupId: number): Promise<void> => {
  await ModifierGroupUpgradeModel.destroy({ where: { modifierGroupId } })
}
