import { z } from 'zod'
import { Measure } from '../services/measure/measure.types'
import { getMeasureByName } from '../services/measure/measure.service'

export const measureSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
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
  const result = await measureSchema.safeParseAsync(measure)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  await validateName(result.data.name, result.data.id)

  return result.data
}

export const validatePartialMeasure = async (measure: any): Promise<Partial<Measure>> => {
  const result = await measureSchema.partial().safeParseAsync(measure)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateMeasures = async (measures: any[]): Promise<Measure[]> => {
  return await Promise.all(measures.map(async (measure) => await validateMeasure(measure)))
}


const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getMeasureByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}
