import { Provider, NewProvider } from './provider.types'
import { ProviderModel } from '../../db/models/provider.model'
import { validateProvider } from '../../factories/provider.factory'
import { getNow } from '../../utils/timeManager'

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
  return await validateProvider(response)
}

export const saveProvider = async (provider: NewProvider): Promise<void> => {
  const now = getNow()
  provider.createdAt = now
  provider.updatedAt = now
  await ProviderModel.create(provider)
}

export const updateProvider = async (provider: Partial<Provider>, id: number): Promise<void> => {
  const now = getNow()
  provider.updatedAt = now
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
