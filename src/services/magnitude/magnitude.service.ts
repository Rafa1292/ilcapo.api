import { Magnitude, NewMagnitude } from './magnitude.types'
import { MagnitudeModel } from '../../db/models/magnitude.model'
import { toNewMagnitude, toNewMagnitudes } from '../../factories/magnitude.factory'

export const getMagnitudes = async (): Promise<Magnitude[]> => {
  const magnitudes = await MagnitudeModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          all: true
        }
      ]
    }
  )

  return await toNewMagnitudes(magnitudes)
}

export const getMagnitudeById = async (id: number): Promise<Magnitude> => {
  const response = await MagnitudeModel.findByPk(id)
  if (response === null) throw new Error('Magnitude not found')
  if (response.delete) throw new Error('Magnitude deleted')
  return await toNewMagnitude(response)
}

export const saveMagnitude = async (magnitude: NewMagnitude): Promise<Magnitude> => {
  const savedMagnitude = await MagnitudeModel.create(magnitude)
  return await toNewMagnitude(savedMagnitude)
}

export const updateMagnitude = async (magnitude: Partial<Magnitude>, id: number): Promise<void> => {
  await MagnitudeModel.update(magnitude, { where: { id } })
}

export const deleteMagnitude = async (id: number): Promise<void> => {
  const magnitude = await getMagnitudeById(id)
  magnitude.delete = true
  await updateMagnitude(magnitude, id)
}

export const getMagnitudesWithDeletedItems = async (): Promise<MagnitudeModel[]> => {
  const magnitudes = await MagnitudeModel.findAll()
  return magnitudes
}

export const recoveryMagnitude = async (id: number): Promise<void> => {
  const magnitude = await getMagnitudeById(id)
  magnitude.delete = false
  await updateMagnitude(magnitude, id)
}
