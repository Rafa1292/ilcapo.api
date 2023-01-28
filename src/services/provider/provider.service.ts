import { Provider, NewProvider } from './provider.types'
import { ProviderModel } from '../../db/models/provider.model'
import { toNewProvider } from '../../factories/provider.factory'

export const getProviders = async (): Promise<Provider[]> => {
  return await ProviderModel.findAll(
    {
      where: {
        delete: false
      }
    }
  )
}

export const getProviderById = async (id: number): Promise<Provider> => {
  const response = await ProviderModel.findByPk(id)
  if (response === null) throw new Error('Provider not found')
  if (response.delete) throw new Error('Provider deleted')
  return await toNewProvider(response)
}

export const saveProvider = async (provider: NewProvider): Promise<Provider> => {
  return await ProviderModel.create(provider)
}

export const updateProvider = async (provider: Partial<Provider>, id: number): Promise<Provider> => {
  await ProviderModel.update(provider, { where: { id } })
  return await getProviderById(id)
}

export const deleteProvider = async (id: number): Promise<Provider> => {
  const provider = await getProviderById(id)
  provider.delete = true
  return await updateProvider(provider, id)
}
