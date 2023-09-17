import { ModifierElement } from '../services/modifierElement/modifierElement.types'
import * as modifierElementValidator from '../validations/modifierElement.validator'
import { toNewModifierElementUpgrade } from './modifierElementUpgrade.factory'

export const toNewModifierElement = async (modifierElement: any): Promise<ModifierElement> => {
  const id = await modifierElementValidator.newModifierElementIsValid(modifierElement)

  const newModifierElement = {
    id: id > 0 ? id : modifierElement.id,
    name: modifierElement.name,
    modifierGroupId: modifierElement.modifierGroupId,
    prices: modifierElement.prices,
    defaultRecipeId: modifierElement.defaultRecipeId,
    combinable: modifierElement.combinable,
    modifierUpgrade: modifierElement.modifierUpgrade === null || modifierElement.modifierUpgrade === undefined ? modifierElement.modifierUpgrade : await toNewModifierElementUpgrade(modifierElement.modifierUpgrade),
    combinableModifierGroupId: modifierElement.combinableModifierGroupId,
    productReference: modifierElement.productReference,
    createdBy: modifierElement.createdBy,
    updatedBy: modifierElement.updatedBy,
    createdAt: modifierElement.createdAt,
    updatedAt: modifierElement.updatedAt,
    delete: modifierElement.delete
  }
  return newModifierElement
}

export const toNewModifierElements = async (modifierElements: any): Promise<ModifierElement[]> => {
  const modifierElementsArray: ModifierElement[] = []

  for (const modifierElement of modifierElements) {
    modifierElementsArray.push(await toNewModifierElement(modifierElement))
  }

  return modifierElementsArray
}
