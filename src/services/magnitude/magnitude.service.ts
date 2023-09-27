import { Magnitude, MagnitudeAttributes } from './magnitude.types'
import { MagnitudeModel } from '../../db/models/magnitude.model'

export const getMagnitudes = async (): Promise<Magnitude[]> => {
  return await MagnitudeModel.findAll(
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
}

export const getMagnitudeByName = async (name: string, id: number): Promise<Magnitude | undefined> => {
  const objs = await MagnitudeModel.findAll({})
  const obj = objs.find((tmp: Magnitude) => {
    return tmp.name.toLowerCase() === name.toLowerCase() && tmp.id !== id
  })
  return obj
}

export const getMagnitudeById = async (id: number): Promise<Magnitude> => {
  const magnitude = await MagnitudeModel.findByPk(id)
  if (magnitude === null) throw new Error('Magnitude not found')
  if (magnitude.delete) throw new Error('Magnitude deleted')
  return magnitude
}

export const saveMagnitude = async (magnitude: Magnitude): Promise<Magnitude> => {
  const {id, ...rest} = MagnitudeModel.getMagnitude(magnitude, 0)
  return await MagnitudeModel.create(rest)
}

export const updateMagnitude = async (magnitude: Partial<MagnitudeAttributes>, id: number): Promise<void> => {
  const updateMagnitude = MagnitudeModel.getPartialMagnitude(magnitude, 0)
  await MagnitudeModel.update(updateMagnitude, { where: { id } })
}

export const deleteMagnitude = async (id: number): Promise<void> => {
  await updateMagnitude({ delete: true }, id)
}

export const getMagnitudesWithDeletedItems = async (): Promise<MagnitudeModel[]> => {
  return await MagnitudeModel.findAll()
}

export const recoveryMagnitude = async (id: number): Promise<void> => {
  await updateMagnitude({ delete: false }, id)
}
