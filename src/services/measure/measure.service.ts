import { Measure, NewMeasure } from './measure.types'
import { MeasureModel } from '../../db/models/measure.model'
import { toNewMeasure } from '../../factories/measure.factory'

export const getMeasures = async (): Promise<Measure[]> => {
  return await MeasureModel.findAll(
    {
      where: {
        delete: false
      }
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
  return await MeasureModel.create(measure)
}

export const updateMeasure = async (measure: Partial<Measure>, id: number): Promise<void> => {
  await MeasureModel.update(measure, { where: { id } })
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
