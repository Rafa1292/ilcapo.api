
export const newModifierElementUpgradeIsValid = async (modifierElementUpgrade: any): Promise<boolean> => {
  let isValid = true

  if (modifierElementUpgrade.modifierGroupId === undefined) {
    isValid = false
  }

  if (modifierElementUpgrade.modifierGroupUpgradeId === undefined) {
    isValid = false
  }

  if (typeof modifierElementUpgrade.label !== 'string' || !(modifierElementUpgrade.label instanceof String)) {
    isValid = false
  }

  if (modifierElementUpgrade.price === undefined || modifierElementUpgrade.price <= 0) {
    isValid = false
  }

  return isValid
}
