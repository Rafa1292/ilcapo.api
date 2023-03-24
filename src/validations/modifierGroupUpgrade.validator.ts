
export const newModifierGroupUpgradeIsValid = async (modifierGroupUpgrade: any): Promise<boolean> => {
  let isValid = true

  if (modifierGroupUpgrade.modifierGroupId === undefined) {
    isValid = false
  }

  if (modifierGroupUpgrade.modifierGroupUpgradeId === undefined) {
    isValid = false
  }

  if (typeof modifierGroupUpgrade.label !== 'string' || !(modifierGroupUpgrade.label instanceof String)) {
    isValid = false
  }

  if (modifierGroupUpgrade.price === undefined || modifierGroupUpgrade.price <= 0) {
    isValid = false
  }

  return isValid
}
