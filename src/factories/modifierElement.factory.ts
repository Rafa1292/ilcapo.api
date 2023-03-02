import { ModifierElement } from '../services/modifierElement/modifierElement.types'
import * as modifierElementValidator from '../validations/modifierElement.validator'

export const toNewModifierElement = async (modifierElement: any): Promise<ModifierElement> => {
  await modifierElementValidator.newModifierElementIsValid(modifierElement)

  return {
    id: modifierElement.id,
    name: modifierElement.name,
    price: modifierElement.price,
    quantity: modifierElement.quantity,
    isProduct: modifierElement.isProduct,
    productReferenceId: modifierElement.productReferenceId,
    createdBy: modifierElement.createdBy,
    updatedBy: modifierElement.updatedBy,
    createdAt: modifierElement.createdAt,
    updatedAt: modifierElement.updatedAt,
    delete: modifierElement.delete
  }
}
