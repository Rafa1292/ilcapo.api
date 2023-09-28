import { z } from 'zod'
import { PreparationStep } from '../services/preparationStep/preparationStep.types'
import { preparationStepInputSchema } from './preparationStepInput.factory'

export const preparationStepSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  stepNumber: z.number({
    required_error: 'El numero de paso es requerido',
    invalid_type_error: 'El numero de paso debe ser un numero entero',
  }),
  description: z.string({
    required_error: 'La descripcion es requerida',
    invalid_type_error: 'La descripcion debe ser un texto',
  }),
  cost: z.number({
    required_error: 'El costo es requerido',
    invalid_type_error: 'El costo debe ser un numero entero',
  }),
  minutesOfPreparation: z.number({
    required_error: 'Los minutos de preparacion son requeridos',
    invalid_type_error: 'Los minutos de preparacion deben ser un numero entero',
  }),
  ingredientId: z.number({
    required_error: 'El ingrediente es requerido',
    invalid_type_error: 'El ingrediente debe ser un numero entero',
  }),
  preparationStepInputs: z.union([z.array(preparationStepInputSchema), z.undefined()]),
})

export const validatePreparationStep = async (preparationStep: any): Promise<PreparationStep> => {
  const result = await preparationStepSchema.safeParseAsync(preparationStep)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialPreparationStep = async (preparationStep: any): Promise<Partial<PreparationStep>> => {
  
  const result = await preparationStepSchema.partial().safeParseAsync(preparationStep)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
} 

export const validatePreparationSteps = async (preparationSteps: any[]): Promise<PreparationStep[]> => {
  return await Promise.all(
    preparationSteps.map(async (preparationStep) => {
      return await validatePreparationStep(preparationStep)
    })
  )
}
