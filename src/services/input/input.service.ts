import { Input, NewInput } from './input.types'
import { InputModel } from '../../db/models/input.model'
import { toNewInput } from '../../factories/input.factory'

export const getInputs = async (): Promise<Input[]> => {
  return await InputModel.findAll(
    {
      where: {
        delete: false
      }
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
  return await toNewInput(response)
}

export const saveInput = async (input: NewInput): Promise<Input> => {
  return await InputModel.create(input)
}

export const updateInput = async (input: Partial<Input>, id: number): Promise<void> => {
  await InputModel.update(input, { where: { id } })
}

export const deleteInput = async (id: number): Promise<void> => {
  const input = await getInputById(id)
  input.delete = true
  await updateInput(input, id)
}

export const recoveryInput = async (id: number): Promise<void> => {
  const input = await getInputById(id)
  input.delete = false
  await updateInput(input, id)
}
