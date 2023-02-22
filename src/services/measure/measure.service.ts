import { Measure, NewMeasure } from './measure.types'
import { MeasureModel } from '../../db/models/measure.model'
import { toNewMeasure } from '../../factories/measure.factory'

export const getMeasures = async (): Promise<Measure[]> => {
  return await MeasureModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'magnitude'
        }
      ]
    }
  )
}

export const getMeasuresWithDeletedItems = async (): Promise<Measure[]> => {
  return await MeasureModel.findAll()
}

export const getMeasureById = async (id: number): Promise<Measure> => {
  const response = await MeasureModel.findByPk(id)
  if (response === null) throw new Error('Measure not found')
  if (response.delete) throw new Error('Measure deleted')
  return await toNewMeasure(response)
}

export const saveMeasure = async (measure: NewMeasure): Promise<Measure> => {
  const savedMeasure = await MeasureModel.create(measure)
  if (savedMeasure.principalMeasure) await updatePrincipalMeasure(savedMeasure.id, savedMeasure.magnitudeId)
  return await toNewMeasure(savedMeasure)
}

export const updateMeasure = async (measure: Partial<Measure>, id: number): Promise<void> => {
  await MeasureModel.update(measure, { where: { id } })
  if (measure.principalMeasure !== undefined && measure.principalMeasure) {
    if (measure.magnitudeId === undefined) {
      const measure = await getMeasureById(id)
      await updatePrincipalMeasure(id, measure.magnitudeId)
    } else {
      await updatePrincipalMeasure(id, measure.magnitudeId)
    }
  }
}

export const deleteMeasure = async (id: number): Promise<void> => {
  const measure = await getMeasureById(id)
  measure.delete = true
  await updateMeasure(measure, id)
}

export const recoveryMeasure = async (id: number): Promise<void> => {
  const measure = await getMeasureById(id)
  measure.delete = false
  await updateMeasure(measure, id)
}

const updatePrincipalMeasure = async (principalMeasureId: number, magnitudeId: number): Promise<void> => {
  const measures = await (await getMeasures()).filter(measure => measure.magnitudeId === magnitudeId && measure.id !== principalMeasureId)
  measures.map(async measure => (await updateMeasure({ principalMeasure: false }, measure.id))
  )
}
