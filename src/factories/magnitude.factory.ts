import { Magnitude } from '../services/magnitude/magnitude.types'
import * as magnitudeValidator from '../validations/magnitude.validator'

export const toNewMagnitude = async (magnitude: any): Promise<Magnitude> => {
  await magnitudeValidator.newMagnitudeIsValid(magnitude)

  return {
    id: magnitude.id,
    name: magnitude.name,
    createdBy: magnitude.createdBy,
    updatedBy: magnitude.updatedBy,
    createdAt: magnitude.createdAt,
    updatedAt: magnitude.updatedAt,
    delete: magnitude.delete
  }
}
