import { Input, NewInput } from './input.types'
import { InputModel } from '../../db/models/input.model'
import { validateInput } from '../../factories/input.factory'
import { getNow } from '../../utils/timeManager'

export const getInputs = async (): Promise<Input[]> => {
  return await InputModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'measure'
        }
      ]
    }
  )
}

export const getInputsWithDeletedItems = async (): Promise<Input[]> => {
  return await InputModel.findAll()
}

export const getInputById = async (id: number): Promise<Input> => {
  const response = await InputModel.findByPk(id)
  if (response === null) throw new Error('Input not found')
  if (response.delete) throw new Error('Input deleted')
  return await validateInput(response)
}

export const saveInput = async (input: NewInput): Promise<Input> => {
  const now = getNow()
  input.createdAt = now
  input.updatedAt = now
  return await InputModel.create(input)
}

export const updateInput = async (input: Partial<Input>, id: number): Promise<void> => {
  const now = getNow()
  input.updatedAt = now
  await InputModel.update(input, { where: { id } })
}

export const deleteInput = async (id: number): Promise<void> => {
  const input = await getInputById(id)
  const now = getNow()
  input.updatedAt = now
  input.delete = true
  await updateInput(input, id)
}

export const recoveryInput = async (id: number): Promise<void> => {
  const input = await getInputById(id)
  const now = getNow()
  input.updatedAt = now
  input.delete = false
  await updateInput(input, id)
}
