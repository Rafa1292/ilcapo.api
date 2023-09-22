import { z } from 'zod'
import { PreparationStepInput } from '../services/preparationStepInput/preparationStepInput.types'

export const preparationStepInputSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  quantity: z.number({
    required_error: 'La cantidad es requerida',
    invalid_type_error: 'La cantidad debe ser un numero entero',
  }),
  inputId: z.number({
    required_error: 'El insumo es requerido',
    invalid_type_error: 'El insumo debe ser un numero entero',
  }),
  preparationStepId: z.number({
    required_error: 'El paso de preparacion es requerido',
    invalid_type_error: 'El paso de preparacion debe ser un numero entero',
  }),
  measureId: z.number({
    required_error: 'La medida es requerida',
    invalid_type_error: 'La medida debe ser un numero entero',
  }),
})

export const validatePreparationStepInput = async (preparationStepInput: any): Promise<PreparationStepInput> => {
  const result = await preparationStepInputSchema.safeParseAsync(preparationStepInput)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePartialPreparationStepInput = async (preparationStepInput: any): Promise<Partial<PreparationStepInput>> => {
  const result = await preparationStepInputSchema.partial().safeParseAsync(preparationStepInput)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}

export const validatePreparationStepInputs = async (preparationStepInputs: any[]): Promise<PreparationStepInput[]> => {
  return await Promise.all(
    preparationStepInputs.map(async (preparationStepInput) => {
      return await validatePreparationStepInput(preparationStepInput)
    })
  )
}
