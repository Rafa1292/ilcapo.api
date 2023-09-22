import { ProviderInput, NewProviderInput } from './providerInput.types'
import { ProviderInputModel } from '../../db/models/providerInput.model'
import { validateProviderInput, validateProviderInputs } from '../../factories/providerInput.factory'
import { newProviderInputIsValid } from '../../validations/providerInput.validator'
import { getNow } from '../../utils/timeManager'

export const getProviderInputById = async (id: number): Promise<ProviderInput> => {
  const response = await ProviderInputModel.findByPk(id)
  if (response === null) throw new Error('ProviderInput not found')
  return await validateProviderInput(response)
}

export const saveProviderInput = async (providerInput: NewProviderInput): Promise<ProviderInput> => {
  await newProviderInputIsValid(providerInput)
  const now = getNow()
  providerInput.createdAt = now
  providerInput.updatedAt = now
  return await ProviderInputModel.create(providerInput)
}

export const updateProviderInput = async (providerInput: Partial<ProviderInput>, id: number): Promise<ProviderInput> => {
  await newProviderInputIsValid({ ...providerInput, id })
  const now = getNow()
  providerInput.updatedAt = now
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

export const getProviderInputByProviderIdAndInputIdAndBrandId = async (id: number, providerId: number, inputId: number, brandId: number): Promise<ProviderInput | null> => {
  const response = await ProviderInputModel.findOne({ where: { providerId, inputId, brandId } })
  if (response !== null && response.id !== id) {
    return await validateProviderInput(response)
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
  return await validateProviderInputs(response)
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
  return await validateProviderInputs(response)
}
