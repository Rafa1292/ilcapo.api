import { ModifierGroupUpgrade, NewModifierGroupUpgrade } from './modifierGroupUpgrade.types'
import { ModifierGroupUpgradeModel } from '../../db/models/modifierGroupUpgrade.model'

export const saveModifierGroupUpgrade = async (modifierGroupUpgrade: NewModifierGroupUpgrade): Promise<ModifierGroupUpgrade> => {
  return await ModifierGroupUpgradeModel.create(modifierGroupUpgrade)
}

export const updateModifierGroupUpgrade = async (modifierGroupUpgrade: Partial<ModifierGroupUpgrade>, id: number): Promise<void> => {
  await ModifierGroupUpgradeModel.update(modifierGroupUpgrade, { where: { id } })
}

export const deleteModifierGroupUpgrade = async (id: number): Promise<void> => {
  await ModifierGroupUpgradeModel.destroy({ where: { id } })
}
