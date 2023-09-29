import { ProviderInput, ProviderInputAttributes } from './providerInput.types'
import { ProviderInputModel } from '../../db/models/providerInput.model'
import { newProviderInputIsValid } from '../../validations/providerInput.validator'

export const getProviderInputById = async (id: number): Promise<ProviderInput> => {
  const providerInput = await ProviderInputModel.findByPk(id)
  if (providerInput === null) throw new Error('ProviderInput not found')
  return providerInput
}

export const saveProviderInput = async (providerInput: ProviderInput): Promise<ProviderInput> => {
  const { id, ...rest } = ProviderInputModel.getProviderInput(providerInput, 0)
  await newProviderInputIsValid(rest)
  return await ProviderInputModel.create(rest)
}

export const updateProviderInput = async (providerInput: Partial<ProviderInputAttributes>, id: number): Promise<ProviderInput> => {
  const providerInputModel = await getProviderInputById(id)
  const updateProviderInput = 
  await ProviderInputModel.getPartialProviderInput(
    {
      ...providerInput,
      providerId: providerInputModel.providerId,
      inputId: providerInputModel.inputId,
      brandId: providerInputModel.brandId
    }, 0)
  await newProviderInputIsValid({ ...updateProviderInput, id })
  await ProviderInputModel.update(providerInput, { where: { id } })
  return await getProviderInputById(id)
}

export const deleteProviderInput = async (id: number): Promise<ProviderInput> => {
  return await updateProviderInput({ delete: true }, id)
}

export const recoveryProviderInput = async (id: number): Promise<ProviderInput> => {
  return await updateProviderInput({delete: false}, id)
}

export const getProviderInputByProviderIdAndInputIdAndBrandId = async (id: number, providerId: number, inputId: number, brandId: number): Promise<ProviderInput | null> => {
  const providerInput = await ProviderInputModel.findOne({ where: { providerId, inputId, brandId } })
  if (providerInput !== null && providerInput.id !== id) {
    return providerInput
  }

  return null
}

export const getProviderInputsByInputId = async (inputId: number): Promise<ProviderInput[]> => {
  const providerInput = await ProviderInputModel.findAll(
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
  if (providerInput === null) throw new Error('ProviderInput not found')
  return providerInput
}

export const getProviderInputsByProviderId = async (providerId: number): Promise<ProviderInput[]> => {
  const providerInputs = await ProviderInputModel.findAll(
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
  if (providerInputs === null) throw new Error('ProviderInput not found')
  return providerInputs
}
