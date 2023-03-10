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

export const getProvidersWithDeletedItems = async (): Promise<Provider[]> => {
  return await ProviderModel.findAll()
}

export const getProviderById = async (id: number): Promise<Provider> => {
  const response = await ProviderModel.findByPk(id)
  if (response === null) throw new Error('Provider not found')
  if (response.delete) throw new Error('Provider deleted')
  return await toNewProvider(response)
}

export const saveProvider = async (provider: NewProvider): Promise<void> => {
  await ProviderModel.create(provider)
}

export const updateProvider = async (provider: Partial<Provider>, id: number): Promise<void> => {
  await ProviderModel.update(provider, { where: { id } })
}

export const deleteProvider = async (id: number): Promise<void> => {
  const provider = await getProviderById(id)
  provider.delete = true
  await updateProvider(provider, id)
}

export const recoveryProvider = async (id: number): Promise<void> => {
  const provider = await getProviderById(id)
  provider.delete = false
  await updateProvider(provider, id)
}
