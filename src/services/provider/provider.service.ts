import { Provider } from './provider.types'
import { ProviderModel } from '../../db/models/provider.model'
import { toNewProvider } from '../../factories/provider.factory'

export const getProviders = async (): Promise<Provider[]> => {
  return await ProviderModel.findAll()
}

export const getProviderById = async (id: number): Promise<Provider> => {
  const response = await ProviderModel.findByPk(id)
  return toNewProvider(response)
}

export const saveProvider = async (provider: Provider): Promise<Provider> => {
  return await ProviderModel.create(provider)
}

export const updateProvider = async (provider: Partial<Provider>, id: number): Promise<Provider> => {
  await ProviderModel.update(provider, { where: { id } })
  return await getProviderById(id)
}