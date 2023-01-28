import { Magnitude, NewMagnitude } from './magnitude.types'
import { MagnitudeModel } from '../../db/models/magnitude.model'
import { toNewMagnitude } from '../../factories/magnitude.factory'

export const getMagnitudes = async (): Promise<Magnitude[]> => {
  return await MagnitudeModel.findAll(
    {
      where: {
        delete: false
      }
    }
  )
}

export const getMagnitudeById = async (id: number): Promise<Magnitude> => {
  const response = await MagnitudeModel.findByPk(id)
  if (response === null) throw new Error('Magnitude not found')
  if (response.delete) throw new Error('Magnitude deleted')
  return await toNewMagnitude(response)
}

export const saveMagnitude = async (magnitude: NewMagnitude): Promise<Magnitude> => {
  return await MagnitudeModel.create(magnitude)
}

export const updateMagnitude = async (magnitude: Partial<Magnitude>, id: number): Promise<Magnitude> => {
  await MagnitudeModel.update(magnitude, { where: { id } })
  return await getMagnitudeById(id)
}

export const deleteMagnitude = async (id: number): Promise<Magnitude> => {
  const magnitude = await getMagnitudeById(id)
  magnitude.delete = true
  return await updateMagnitude(magnitude, id)
}
