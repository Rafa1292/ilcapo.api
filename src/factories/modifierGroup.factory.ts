import { z } from 'zod'
import { ModifierGroup } from '../services/modifierGroup/modifierGroup.types'
import { modifierElementSchema } from './modifierElement.factory'
import { getModifierGroupByName } from '../services/modifierGroup/modifierGroup.service'

export const modifierGroupSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un texto',
  }),
  showLabel: z.boolean({
    required_error: 'El showLabel es requerido',
    invalid_type_error: 'El showLabel debe ser un booleano',
  }),
  elements: z.union([z.array(modifierElementSchema), z.undefined()])
})

export const validateModifierGroup = async (modifierGroup: any): Promise<ModifierGroup> => {
  const result = await modifierGroupSchema.safeParseAsync(modifierGroup)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  await validateName(result.data.name, result.data.id)

  return result.data
}

export const validatePartialModifierGroup = async (modifierGroup: any): Promise<Partial<ModifierGroup>> => {
  const result = await modifierGroupSchema.partial().safeParseAsync(modifierGroup)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateModifierGroups = async (modifierGroups: any[]): Promise<ModifierGroup[]> => {
  return await Promise.all(modifierGroups.map(async (modifierGroup: any) => await validateModifierGroup(modifierGroup)))
}

const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getModifierGroupByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}