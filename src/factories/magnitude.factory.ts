import { z } from 'zod'
import { Magnitude } from '../services/magnitude/magnitude.types'
import { measureSchema } from './measure.factory'
import { getMagnitudeByName } from '../services/magnitude/magnitude.service'

export const magnitudeSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  name: z.string({
    required_error: 'El nombre de la magnitud es requerido',
    invalid_type_error: 'El nombre de la magnitud debe ser  un texto',
  }),
  measures: z.array(measureSchema).optional()
})

export const validateMagnitude = async (magnitude: any): Promise<Magnitude> => {
  const result = await magnitudeSchema.safeParseAsync(magnitude)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  await validateName(result.data.name, result.data.id)
  return result.data

}

export const validatePartialMagnitude = async (magnitude: any): Promise<Partial<Magnitude>> => {
  const result = await magnitudeSchema.partial().safeParseAsync(magnitude)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateMagnitudes = async (magnitudes: any[]): Promise<Magnitude[]> => {
  const newMagnitudes: Magnitude[] = []

  for (const magnitude of magnitudes) {
    newMagnitudes.push(await validateMagnitude(magnitude))
  }

  return newMagnitudes
}

const validateName = async (name: string, id: number): Promise<void> => {
  const object = await getMagnitudeByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}
