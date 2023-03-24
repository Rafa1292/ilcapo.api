import { ModifierElement } from '../services/modifierElement/modifierElement.types'
import * as modifierElementValidator from '../validations/modifierElement.validator'

export const toNewModifierElement = async (modifierElement: any, modifierGroupId: number): Promise<ModifierElement> => {
  const id = await modifierElementValidator.newModifierElementIsValid(modifierElement, modifierGroupId)

  return {
    id: id > 0 ? id : modifierElement.id,
    name: modifierElement.name,
    price: modifierElement.price,
    quantity: modifierElement.quantity,
    defaultRecipeId: modifierElement.defaultRecipeId,
    combinable: modifierElement.combinable,
    numberOfParts: modifierElement.numberOfParts,
    combinableModifierGroupId: modifierElement.combinableModifierGroupId,
    productReference: modifierElement.productReference,
    createdBy: modifierElement.createdBy,
    updatedBy: modifierElement.updatedBy,
    createdAt: modifierElement.createdAt,
    updatedAt: modifierElement.updatedAt,
    delete: modifierElement.delete
  }
}
