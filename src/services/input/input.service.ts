import { Input, InputAttributes } from './input.types'
import { InputModel } from '../../db/models/input.model'

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
  const input = await InputModel.findByPk(id)
  if (input === null) throw new Error('Input not found')
  if (input.delete) throw new Error('Input deleted')
  return input
}

export const saveInput = async (input: Input): Promise<Input> => {
  const {id, ...rest} = InputModel.getInput(input, 0)
  return await InputModel.create(rest)
}

export const updateInput = async (input: Partial<InputAttributes>, id: number): Promise<void> => {
  const updateInput = InputModel.getPartialInput(input, id)
  await InputModel.update(updateInput, { where: { id } })
}

export const deleteInput = async (id: number): Promise<void> => {
  await updateInput({ delete: true }, id)
}

export const recoveryInput = async (id: number): Promise<void> => {
  await updateInput({ delete: false }, id)
}
