import { Sequelize } from 'sequelize'
import { ProviderModel, providerSchema } from './provider.model'
import { ProviderInputModel, ProviderInputSchema } from './providerInput.model'

export const setUpModels = async (sequelize: Sequelize): Promise<void> => {
  ProviderInputModel.init(ProviderInputSchema, ProviderInputModel.config(sequelize))
  ProviderModel.init(providerSchema, ProviderModel.config(sequelize))
  ProviderModel.associate(sequelize.models)
  await ProviderModel.sync()
  await ProviderInputModel.sync()
}
