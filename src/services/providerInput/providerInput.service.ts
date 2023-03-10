import { ProviderInput, NewProviderInput } from './providerInput.types'
import { ProviderInputModel } from '../../db/models/providerInput.model'
import { toNewProviderInput, toNewProviderInputs } from '../../factories/providerInput.factory'
import { newProviderInputIsValid } from '../../validations/providerInput.validator'

export const getProviderInputById = async (id: number): Promise<ProviderInput> => {
  const response = await ProviderInputModel.findByPk(id)
  if (response === null) throw new Error('ProviderInput not found')
  return await toNewProviderInput(response)
}

export const saveProviderInput = async (providerInput: NewProviderInput): Promise<ProviderInput> => {
  await newProviderInputIsValid(providerInput)
  return await ProviderInputModel.create(providerInput)
}

export const updateProviderInput = async (providerInput: Partial<ProviderInput>, id: number): Promise<ProviderInput> => {
  await newProviderInputIsValid(providerInput)
  await ProviderInputModel.update(providerInput, { where: { id } })
  return await getProviderInputById(id)
}

export const deleteProviderInput = async (id: number): Promise<ProviderInput> => {
  const providerInput = await getProviderInputById(id)
  providerInput.delete = true
  return await updateProviderInput(providerInput, id)
}

export const recoveryProviderInput = async (id: number): Promise<ProviderInput> => {
  const providerInput = await getProviderInputById(id)
  providerInput.delete = false
  return await updateProviderInput(providerInput, id)
}

export const getProviderInputByProviderIdAndInputIdAndBrandId = async (providerId: number, inputId: number, brandId: number): Promise<ProviderInput | null> => {
  const response = await ProviderInputModel.findOne({ where: { providerId, inputId, brandId } })
  if (response !== null) {
    return await toNewProviderInput(response)
  }

  return null
}

export const getProviderInputsByInputId = async (inputId: number): Promise<ProviderInput[]> => {
  const response = await ProviderInputModel.findAll(
    {
      where:
      {
        inputId, delete: false
      },
      include: [
        {
          association: 'provider',
          where: { delete: false }
        },
        {
          association: 'brand',
          where: { delete: false }
        },
        {
          association: 'measure',
          where: { delete: false }
        }
      ]
    })
  if (response === null) throw new Error('ProviderInput not found')
  return await toNewProviderInputs(response)
}

export const getProviderInputsByProviderId = async (providerId: number): Promise<ProviderInput[]> => {
  const response = await ProviderInputModel.findAll(
    {
      where:
      {
        providerId, delete: false
      },
      include: [
        {
          association: 'input',
          where: { delete: false }
        },
        {
          association: 'brand',
          where: { delete: false }
        },
        {
          association: 'measure',
          where: { delete: false }
        }
      ]
    })
  if (response === null) throw new Error('ProviderInput not found')
  return await toNewProviderInputs(response)
}
