import { z } from 'zod'
import { Measure } from '../services/measure/measure.types'
import * as measureValidator from '../validations/measure.validator'

export const measureSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  name: z.string({
    required_error: 'El nombre de la marca es requerido',
    invalid_type_error: 'El nombre de la marca debe ser  un texto',
  }),
  principalMeasure: z.boolean({
    required_error: 'La medida principal es requerida',
    invalid_type_error: 'La medida principal debe ser un booleano',
  }),
  value: z.number({
    required_error: 'El valor es requerido',
    invalid_type_error: 'El valor debe ser un numero entero',
  }),
  abbreviation: z.string({
    required_error: 'La abreviatura es requerida',
    invalid_type_error: 'La abreviatura debe ser un texto',
  }),
  magnitudeId: z.number({
    required_error: 'La magnitud es requerida',
    invalid_type_error: 'La magnitud debe ser un numero entero',
  }),
})


export const validateMeasure = async (measure: any): Promise<Measure> => {
  await measureValidator.newMeasureIsValid(measure)
  const result = await measureSchema.safeParseAsync(measure)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  return result.data
}
