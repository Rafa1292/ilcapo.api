import { z } from 'zod'
import { ModifierElement } from '../services/modifierElement/modifierElement.types'
import * as modifierElementValidator from '../validations/modifierElement.validator'
import { elementPriceSchema } from './elementPrice.factory'

export const modifierElementSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre del elemento es requerido',
    invalid_type_error: 'El nombre del elemento debe ser  un texto',
  }),
  modifierGroupId: z.number({
    required_error: 'El grupo de modificadores es requerido',
    invalid_type_error: 'El grupo de modificadores debe ser un numero entero',
  }),
  defaultRecipeId: z.number({
    required_error: 'La receta por defecto es requerida',
    invalid_type_error: 'La receta por defecto debe ser un numero entero',
  }),
  combinable: z.boolean({
    required_error: 'La combinabilidad es requerida',
    invalid_type_error: 'La combinabilidad debe ser un booleano',
  }),
  combinableModifierGroupId: z.number({
    required_error: 'El grupo de modificadores combinables es requerido',
    invalid_type_error: 'El grupo de modificadores combinables debe ser un numero entero',
  }),
  prices: z.array(elementPriceSchema)
})

export const validateModifierElement = async (modifierElement: any): Promise<ModifierElement> => {
  const result = await modifierElementSchema.safeParseAsync(modifierElement)
  await modifierElementValidator.newModifierElementIsValid(modifierElement)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data  
}

export const validatePartialModifierElement = async (modifierElement: any): Promise<Partial<ModifierElement>> => {
  const result = await modifierElementSchema.partial().safeParseAsync(modifierElement)
  await modifierElementValidator.newModifierElementIsValid(modifierElement)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data  
}

export const validateModifierElements = async (modifierElements: any): Promise<ModifierElement[]> => {
  const modifierElementsArray: ModifierElement[] = []

  for (const modifierElement of modifierElements) {
    modifierElementsArray.push(await validateModifierElement(modifierElement))
  }

  return modifierElementsArray
}
