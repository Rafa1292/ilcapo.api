import { z } from 'zod'
import { ModifierGroup } from '../services/modifierGroup/modifierGroup.types'
import * as modifierGroupValidator from '../validations/modifierGroup.validator'
import { modifierElementSchema } from './modifierElement.factory'

export const modifierGroupSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un texto',
  }),
  showLabel: z.boolean({
    required_error: 'El showLabel es requerido',
    invalid_type_error: 'El showLabel debe ser un booleano',
  }),
  elements: z.array(modifierElementSchema),
})

export const validateModifierGroup = async (modifierGroup: any): Promise<ModifierGroup> => {
  const result = await modifierGroupSchema.safeParseAsync(modifierGroup)
  await modifierGroupValidator.newModifierGroupIsValid(modifierGroup)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialModifierGroup = async (modifierGroup: any): Promise<Partial<ModifierGroup>> => {
  const result = await modifierGroupSchema.partial().safeParseAsync(modifierGroup)
  await modifierGroupValidator.newModifierGroupIsValid(modifierGroup)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateModifierGroups = async (modifierGroups: any[]): Promise<ModifierGroup[]> => {
  return await Promise.all(modifierGroups.map(async (modifierGroup: any) => await validateModifierGroup(modifierGroup)))
}
