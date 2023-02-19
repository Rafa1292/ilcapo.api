import { Sequelize } from 'sequelize'
import { BrandModel, brandSchema } from './brand.model'
import { GroupElementModel, groupElementSchema } from './groupElement.model'
import { IngredientModel, ingredientSchema } from './ingredient.model'
import { IngredientCategoryModel, ingredientCategorySchema } from './ingredientCategory.model'
import { InputModel, inputSchema } from './input.model'
import { InputCategoryModel, inputCategorySchema } from './inputCategory.model'
import { InventoryModel, inventorySchema } from './inventory.model'
import { InventoryInputModel, inventoryInputSchema } from './inventoryInput.model'
import { MagnitudeModel, magnitudeSchema } from './magnitude.model'
import { MeasureModel, measureSchema } from './measure.model'
import { ModifierElementModel, modifierElementSchema } from './modifierElement.model'
import { ModifierGroupModel, modifierGroupSchema } from './modifierGroup.model'
import { PreparationStepModel, preparationStepSchema } from './preparationStep.model'
import { PreparationStepInputModel, preparationStepInputSchema } from './preparationStepInput.Model'
import { ProductModel, productSchema } from './product.model'
import { ProductModifierModel, productModifierSchema } from './productModifier.model'
import { ProviderModel, providerSchema } from './provider.model'
import { ProviderInputModel, providerInputSchema } from './providerInput.model'
import { RecipeModel, recipeSchema } from './recipe.model'
import { RecipeStepModel, recipeStepSchema } from './recipeStep.model.'
import { RecipeStepIngredientModel, recipeStepIngredientSchema } from './recipeStepIngredient.model'
import { SaleItemModel, saleItemSchema } from './saleItem.model'
import { SaleItemCategoryModel, saleItemCategorySchema } from './saleItemCategory.model'
import { SaleItemProductModel, saleItemProductSchema } from './saleItemProduct.model'

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
  RecipeModel.init(recipeSchema, RecipeModel.config(sequelize))
  RecipeStepModel.init(recipeStepSchema, RecipeStepModel.config(sequelize))
  RecipeStepIngredientModel.init(recipeStepIngredientSchema, RecipeStepIngredientModel.config(sequelize))
  ProductModel.init(productSchema, ProductModel.config(sequelize))
  SaleItemCategoryModel.init(saleItemCategorySchema, SaleItemCategoryModel.config(sequelize))
  SaleItemModel.init(saleItemSchema, SaleItemModel.config(sequelize))
  SaleItemProductModel.init(saleItemProductSchema, SaleItemProductModel.config(sequelize))
  ProductModifierModel.init(productModifierSchema, ProductModifierModel.config(sequelize))
  ModifierGroupModel.init(modifierGroupSchema, ModifierGroupModel.config(sequelize))
  ModifierElementModel.init(modifierElementSchema, ModifierElementModel.config(sequelize))
  GroupElementModel.init(groupElementSchema, GroupElementModel.config(sequelize))
  BrandModel.init(brandSchema, BrandModel.config(sequelize))

  InputCategoryModel.associate(sequelize.models)
  IngredientCategoryModel.associate(sequelize.models)
  IngredientModel.associate(sequelize.models)
  ProviderModel.associate(sequelize.models)
  PreparationStepModel.associate(sequelize.models)
  InputModel.associate(sequelize.models)
  MeasureModel.associate(sequelize.models)
  MagnitudeModel.associate(sequelize.models)
  InventoryModel.associate(sequelize.models)
  RecipeModel.associate(sequelize.models)
  RecipeStepModel.associate(sequelize.models)
  ProductModel.associate(sequelize.models)
  SaleItemCategoryModel.associate(sequelize.models)
  SaleItemModel.associate(sequelize.models)
  ModifierElementModel.associate(sequelize.models)
  ModifierGroupModel.associate(sequelize.models)
  BrandModel.associate(sequelize.models)
  ProviderInputModel.associate(sequelize.models)
  PreparationStepInputModel.associate(sequelize.models)
  RecipeStepIngredientModel.associate(sequelize.models)

  await MagnitudeModel.sync()
  await MeasureModel.sync()
  await IngredientCategoryModel.sync()
  await IngredientModel.sync()
  await InputCategoryModel.sync()
  await InputModel.sync()
  await PreparationStepModel.sync()
  await PreparationStepInputModel.sync()
  await InventoryModel.sync()
  await InventoryInputModel.sync()
  await ProviderModel.sync()
  await BrandModel.sync()
  await ProviderInputModel.sync()
  await ProductModel.sync()
  await RecipeModel.sync()
  await RecipeStepModel.sync()
  await RecipeStepIngredientModel.sync()
  await SaleItemCategoryModel.sync()
  await SaleItemModel.sync()
  await SaleItemProductModel.sync()
  await ModifierGroupModel.sync()
  await ModifierElementModel.sync()
  await GroupElementModel.sync()
  await ProductModifierModel.sync()
}
