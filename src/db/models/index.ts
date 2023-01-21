import { Sequelize } from 'sequelize'
import { InputModel, inputSchema } from './input.model'
import { ProviderModel, providerSchema } from './provider.model'
import { ProviderInputModel, ProviderInputSchema } from './providerInput.model'

export const setUpModels = async (sequelize: Sequelize): Promise<void> => {
  ProviderModel.init(providerSchema, ProviderModel.config(sequelize))
  InputModel.init(inputSchema, InputModel.config(sequelize))
  ProviderInputModel.init(ProviderInputSchema, ProviderInputModel.config(sequelize))

  ProviderModel.associate(sequelize.models)
  InputModel.associate(sequelize.models)

  await ProviderModel.sync()
  await InputModel.sync()
  await ProviderInputModel.sync()
}
