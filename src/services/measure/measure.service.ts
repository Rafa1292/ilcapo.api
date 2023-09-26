import { Measure, MeasureAttributes } from './measure.types'
import { MeasureModel } from '../../db/models/measure.model'

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

export const getMeasuresWithDeletedItems = async (): Promise<MeasureAttributes[]> => {
  return await MeasureModel.findAll()
}

export const getMeasureById = async (id: number): Promise<Measure> => {
  const measure = await MeasureModel.findByPk(id)
  if (measure === null) throw new Error('Measure not found')
  if (measure.delete) throw new Error('Measure deleted')
  return measure
}

export const saveMeasure = async (measure: Measure): Promise<Measure> => {
  const { id, ...rest } = MeasureModel.getMeasure(measure, 0)
  const savedMeasure = await MeasureModel.create(rest)
  if (savedMeasure.principalMeasure) await updatePrincipalMeasure(savedMeasure.id, savedMeasure.magnitudeId)
  return savedMeasure
}

export const updateMeasure = async (measure: Partial<MeasureAttributes>, id: number): Promise<void> => {
  const updateMeasure = MeasureModel.getPartialMeasure(measure, 0)
  await MeasureModel.update(updateMeasure, { where: { id } })
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
  await updateMeasure({ delete: true }, id)
}

export const recoveryMeasure = async (id: number): Promise<void> => {
  await updateMeasure({ delete: false }, id)
}

const updatePrincipalMeasure = async (principalMeasureId: number, magnitudeId: number): Promise<void> => {
  const measures = await (await getMeasures()).filter(measure => measure.magnitudeId === magnitudeId && measure.id !== principalMeasureId)
  measures.map(async measure => (await updateMeasure({ principalMeasure: false }, measure.id))
  )
}
