
export const newModifierElementUpgradeIsValid = async (modifierElementUpgrade: any): Promise<boolean> => {
  let isValid = true

  if (modifierElementUpgrade.newModifierGroupId === undefined) {
    isValid = false
  }

  if (typeof modifierElementUpgrade.label !== 'string') {
    isValid = false
  }

  if (modifierElementUpgrade.price === undefined || modifierElementUpgrade.price <= 0) {
    isValid = false
  }

  if (modifierElementUpgrade.modifierElementId === undefined) {
    isValid = false
  }
  return isValid
}
