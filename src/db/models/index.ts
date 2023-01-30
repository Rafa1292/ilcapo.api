import { Sequelize } from 'sequelize'
import { IngredientModel, ingredientSchema } from './ingredient.model'
import { IngredientCategoryModel, ingredientCategorySchema } from './ingredientCategory.model'
import { InputModel, inputSchema } from './input.model'
import { InputCategoryModel, inputCategorySchema } from './inputCategory.model'
import { InventoryModel, inventorySchema } from './inventory.model'
import { InventoryInputModel, inventoryInputSchema } from './inventoryInput.model'
import { MagnitudeModel, magnitudeSchema } from './magnitude.model'
import { MeasureModel, measureSchema } from './measure.model'
import { PreparationStepModel, preparationStepSchema } from './preparationStep.model'
import { PreparationStepInputModel, preparationStepInputSchema } from './preparationStepInput.Model'
import { ProviderModel, providerSchema } from './provider.model'
import { ProviderInputModel, providerInputSchema } from './providerInput.model'

export const setUpModels = async (sequelize: Sequelize): Promise<void> => {
  InputCategoryModel.init(ingredientCategorySchema, InputCategoryModel.config(sequelize))
  IngredientCategoryModel.init(inputCategorySchema, IngredientCategoryModel.config(sequelize))
  IngredientModel.init(ingredientSchema, IngredientModel.config(sequelize))
  ProviderModel.init(providerSchema, ProviderModel.config(sequelize))
  InputModel.init(inputSchema, InputModel.config(sequelize))
  ProviderInputModel.init(providerInputSchema, ProviderInputModel.config(sequelize))
  MeasureModel.init(measureSchema, MeasureModel.config(sequelize))
  MagnitudeModel.init(magnitudeSchema, MagnitudeModel.config(sequelize))
  InventoryModel.init(inventorySchema, InventoryModel.config(sequelize))
  InventoryInputModel.init(inventoryInputSchema, InventoryInputModel.config(sequelize))
  PreparationStepModel.init(preparationStepSchema, PreparationStepModel.config(sequelize))
  PreparationStepInputModel.init(preparationStepInputSchema, PreparationStepInputModel.config(sequelize))

  InputCategoryModel.associate(sequelize.models)
  IngredientCategoryModel.associate(sequelize.models)
  IngredientModel.associate(sequelize.models)
  ProviderModel.associate(sequelize.models)
  PreparationStepModel.associate(sequelize.models)
  InputModel.associate(sequelize.models)
  MeasureModel.associate(sequelize.models)
  MagnitudeModel.associate(sequelize.models)
  InventoryModel.associate(sequelize.models)

  await InventoryModel.sync()
  await IngredientCategoryModel.sync()
  await IngredientModel.sync()
  await MagnitudeModel.sync()
  await MeasureModel.sync()
  await InputCategoryModel.sync()
  await PreparationStepModel.sync()
  await PreparationStepInputModel.sync()
  await ProviderModel.sync()
  await ProviderInputModel.sync()
  await InputModel.sync()
  await InventoryInputModel.sync()
}
