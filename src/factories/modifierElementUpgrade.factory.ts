import { z } from 'zod'
import { ModifierElementUpgrade } from '../services/modifierElementUpgrade/modifierElementUpgrade.types'
import { upgradeElementPriceSchema } from './upgradeElementPrice.factory'

const modifierElementUpgradeSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  modifierElementId: z.number({
    required_error: 'El elemento de modificador es requerido',
    invalid_type_error: 'El elemento de modificador debe ser un numero entero',
  }),
  newModifierGroupId: z.number({
    required_error: 'El nuevo grupo de modificador es requerido',
    invalid_type_error: 'El nuevo grupo de modificador debe ser un numero entero',
  }),
  label: z.string({
    required_error: 'La etiqueta es requerida',
    invalid_type_error: 'La etiqueta debe ser un texto',
  }),
  prices: z.array(upgradeElementPriceSchema),
})

export const validateModifierElementUpgrade = async (modifierElement: any): Promise<ModifierElementUpgrade> => {
  const result = await modifierElementUpgradeSchema.safeParseAsync(modifierElement)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialModifierElementUpgrade = async (modifierElement: any): Promise<Partial<ModifierElementUpgrade>> => {
  const result = await modifierElementUpgradeSchema.partial().safeParseAsync(modifierElement)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validateModifierElementUpgrades = async (modifierElements: any[]): Promise<ModifierElementUpgrade[]> => {
  return await Promise.all(
    modifierElements.map(async (modifierElement) => {
      return await validateModifierElementUpgrade(modifierElement)
    })
  )
}
