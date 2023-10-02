import { z } from 'zod'
import { ModifierElement } from '../services/modifierElement/modifierElement.types'
import { elementPriceSchema } from './elementPrice.factory'
import { getModifierElementByName } from '../services/modifierElement/modifierElement.service'

export const modifierElementSchema = z.object({
  id: z
    .number({
      required_error: 'El id es requerido',
      invalid_type_error: 'El id debe ser un numero entero',
    })
    .default(0),
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
  combinableGroupId: z.number({
    required_error: 'El grupo de modificadores combinables es requerido',
    invalid_type_error: 'El grupo de modificadores combinables debe ser un numero entero',
  }).default(0),
  prices: z.union([z.array(elementPriceSchema), z.undefined()]),
})

export const validateModifierElement = async (modifierElement: any): Promise<ModifierElement> => {
  const result = await modifierElementSchema.safeParseAsync(modifierElement)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  await validateName(result.data.name, result.data.id)

  return result.data
}

export const validatePartialModifierElement = async (modifierElement: any): Promise<Partial<ModifierElement>> => {
  const result = await modifierElementSchema.partial().safeParseAsync(modifierElement)
  console.log(modifierElement)
  if (!result.success) {
    throw new Error(result.error.message)
  }
  result.data.name && result.data.id && (await validateName(result.data.name, result.data.id))

  return result.data
}

export const validateModifierElements = async (modifierElements: any): Promise<ModifierElement[]> => {
  const modifierElementsArray: ModifierElement[] = []

  for (const modifierElement of modifierElements) {
    modifierElementsArray.push(await validateModifierElement(modifierElement))
  }

  return modifierElementsArray
}

const validateName = async (name: string, id: number): Promise<void> => {
  console.log('validateName-------------------------------', name, id)
  const object = await getModifierElementByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}
