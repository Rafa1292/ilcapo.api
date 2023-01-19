import ProviderModel from './provider.model'

export const setUpModels = async (): Promise<void> => {
  await ProviderModel.sync()
}
