import { Measure } from '../services/measure/measure.types'
import * as measureValidator from '../validations/measure.validator'

export const toNewMeasure = async (measure: any): Promise<Measure> => {
  await measureValidator.newMeasureIsValid(measure)

  return {
    id: measure.id,
    name: measure.name,
    principalMeasure: measure.principalMeasure,
    value: measure.value,
    abbreviation: measure.abbreviation,
    magnitudeId: measure.magnitudeId,
    createdBy: measure.createdBy,
    updatedBy: measure.updatedBy,
    createdAt: measure.createdAt,
    updatedAt: measure.updatedAt,
    delete: measure.delete
  }
}
