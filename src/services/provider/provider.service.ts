import { Provider, ProviderAttributes } from './provider.types'
import { ProviderModel } from '../../db/models/provider.model'

export const getProviders = async (): Promise<Provider[]> => {
  return await ProviderModel.findAll({
    where: {
      delete: false,
    },
  })
}

export const getProvidersWithDeletedItems = async (): Promise<Provider[]> => {
  return await ProviderModel.findAll()
}

export const getProviderById = async (id: number): Promise<Provider> => {
  const provider = await ProviderModel.findByPk(id)
  if (provider === null) throw new Error('Provider not found')
  if (provider.delete) throw new Error('Provider deleted')
  return provider
}

export const saveProvider = async (provider: Provider): Promise<void> => {
  const { id, ...rest } = ProviderModel.getProvider(provider, 0)
  await ProviderModel.create(rest)
}

export const updateProvider = async (
  provider: Partial<ProviderAttributes>,
  id: number
): Promise<void> => {
  const updatedProvider = ProviderModel.getPartialProvider(provider, id)
  await ProviderModel.update(updatedProvider, { where: { id } })
}

export const deleteProvider = async (id: number): Promise<void> => {
  await updateProvider({ delete: true }, id)
}

export const recoveryProvider = async (id: number): Promise<void> => {
  await updateProvider({ delete: false }, id)
}

export const getProviderByName = async (name: string, id: number): Promise<Provider | undefined> => {
  const objs = await ProviderModel.findAll({})
  const obj = objs.find((tmp: Provider) => {
    return tmp.name.toLowerCase() === name.toLowerCase() && tmp.id !== id
  })
  return obj
}
