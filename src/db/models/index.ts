import { Sequelize } from 'sequelize'
import { InputModel, inputSchema } from './input.model'
import { InputCategoryModel, inputCategorySchema } from './inputCategory.model'
import { ProviderModel, providerSchema } from './provider.model'
import { ProviderInputModel, providerInputSchema } from './providerInput.model'

export const setUpModels = async (sequelize: Sequelize): Promise<void> => {
  InputCategoryModel.init(inputCategorySchema, InputCategoryModel.config(sequelize))
  ProviderModel.init(providerSchema, ProviderModel.config(sequelize))
  InputModel.init(inputSchema, InputModel.config(sequelize))
  ProviderInputModel.init(providerInputSchema, ProviderInputModel.config(sequelize))

  InputCategoryModel.associate(sequelize.models)
  ProviderModel.associate(sequelize.models)
  InputModel.associate(sequelize.models)

  await InputCategoryModel.sync()
  await ProviderModel.sync()
  await InputModel.sync()
  await ProviderInputModel.sync()
}
