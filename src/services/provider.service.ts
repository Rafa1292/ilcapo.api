import { ProviderVM } from './types'
import ProviderModel from '../db/models/provider.model'
import { toNewProviderVM } from '../factories/provider.factory'

export const getProvidersVM = async (): Promise<ProviderVM[]> => {
  const providers = await ProviderModel.findAll()
  return providers
}

export const getProviderById = async (id: number): Promise<ProviderVM | undefined> => {
  const response = await ProviderModel.findByPk(id)
  const provider = toNewProviderVM(response)
  if (provider !== undefined) {
    return provider
  }
  return undefined
}

export const saveProvider = async (provider: ProviderVM): Promise<ProviderVM> => {
  const providerModel = await ProviderModel.create(provider)
  return toNewProviderVM(providerModel)
}

export const updateProvider = async (provider: Partial<ProviderVM>, id: number): Promise<ProviderVM | undefined> => {
  await ProviderModel.update(provider, { where: { id } })
  return await getProviderById(id)
}
