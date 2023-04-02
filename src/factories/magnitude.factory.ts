import { Magnitude } from '../services/magnitude/magnitude.types'
import { Measure } from '../services/measure/measure.types'
import * as magnitudeValidator from '../validations/magnitude.validator'

export const toNewMagnitude = async (magnitude: any): Promise<Magnitude> => {
  await magnitudeValidator.newMagnitudeIsValid(magnitude)

  return {
    id: magnitude.id,
    name: magnitude.name,
    measures: magnitude.measures.filter((measure: Measure) => !measure.delete),
    createdBy: magnitude.createdBy,
    updatedBy: magnitude.updatedBy,
    createdAt: magnitude.createdAt,
    updatedAt: magnitude.updatedAt,
    delete: magnitude.delete
  }
}

export const toNewMagnitudes = async (magnitudes: any[]): Promise<Magnitude[]> => {
  const newMagnitudes: Magnitude[] = []

  for (const magnitude of magnitudes) {
    newMagnitudes.push(await toNewMagnitude(magnitude))
  }

  return newMagnitudes
}
