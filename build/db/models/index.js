"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpModels = void 0;
const brand_model_1 = require("./brand.model");
const ingredient_model_1 = require("./ingredient.model");
const ingredientCategory_model_1 = require("./ingredientCategory.model");
const input_model_1 = require("./input.model");
const inputCategory_model_1 = require("./inputCategory.model");
const inventory_model_1 = require("./inventory.model");
const inventoryInput_model_1 = require("./inventoryInput.model");
const magnitude_model_1 = require("./magnitude.model");
const measure_model_1 = require("./measure.model");
const modifierElement_model_1 = require("./modifierElement.model");
const modifierGroup_model_1 = require("./modifierGroup.model");
const modifierElementUpgrade_model_1 = require("./modifierElementUpgrade.model");
const preparationStep_model_1 = require("./preparationStep.model");
const preparationStepInput_Model_1 = require("./preparationStepInput.Model");
const product_model_1 = require("./product.model");
const productModifier_model_1 = require("./productModifier.model");
const productRecipe_model_1 = require("./productRecipe.model");
const productReference_model_1 = require("./productReference.model");
const provider_model_1 = require("./provider.model");
const providerInput_model_1 = require("./providerInput.model");
const recipe_model_1 = require("./recipe.model");
const recipeStep_model_1 = require("./recipeStep.model");
const recipeStepIngredient_model_1 = require("./recipeStepIngredient.model");
const saleItem_model_1 = require("./saleItem.model");
const saleItemCategory_model_1 = require("./saleItemCategory.model");
const saleItemProduct_model_1 = require("./saleItemProduct.model");
const menu_model_1 = require("./menu.model");
const itemPrice_model_1 = require("./itemPrice.model");
const upgradeElementPrice_model_1 = require("./upgradeElementPrice.model");
const elementPrice_model_1 = require("./elementPrice.model");
const umzug_1 = require("umzug");
const setUpModels = (sequelize) => __awaiter(void 0, void 0, void 0, function* () {
    inputCategory_model_1.InputCategoryModel.init(ingredientCategory_model_1.ingredientCategorySchema, inputCategory_model_1.InputCategoryModel.config(sequelize));
    ingredientCategory_model_1.IngredientCategoryModel.init(inputCategory_model_1.inputCategorySchema, ingredientCategory_model_1.IngredientCategoryModel.config(sequelize));
    ingredient_model_1.IngredientModel.init(ingredient_model_1.ingredientSchema, ingredient_model_1.IngredientModel.config(sequelize));
    provider_model_1.ProviderModel.init(provider_model_1.providerSchema, provider_model_1.ProviderModel.config(sequelize));
    input_model_1.InputModel.init(input_model_1.inputSchema, input_model_1.InputModel.config(sequelize));
    providerInput_model_1.ProviderInputModel.init(providerInput_model_1.providerInputSchema, providerInput_model_1.ProviderInputModel.config(sequelize));
    measure_model_1.MeasureModel.init(measure_model_1.measureSchema, measure_model_1.MeasureModel.config(sequelize));
    magnitude_model_1.MagnitudeModel.init(magnitude_model_1.magnitudeSchema, magnitude_model_1.MagnitudeModel.config(sequelize));
    inventory_model_1.InventoryModel.init(inventory_model_1.inventorySchema, inventory_model_1.InventoryModel.config(sequelize));
    inventoryInput_model_1.InventoryInputModel.init(inventoryInput_model_1.inventoryInputSchema, inventoryInput_model_1.InventoryInputModel.config(sequelize));
    preparationStep_model_1.PreparationStepModel.init(preparationStep_model_1.preparationStepSchema, preparationStep_model_1.PreparationStepModel.config(sequelize));
    preparationStepInput_Model_1.PreparationStepInputModel.init(preparationStepInput_Model_1.preparationStepInputSchema, preparationStepInput_Model_1.PreparationStepInputModel.config(sequelize));
    recipe_model_1.RecipeModel.init(recipe_model_1.recipeSchema, recipe_model_1.RecipeModel.config(sequelize));
    recipeStep_model_1.RecipeStepModel.init(recipeStep_model_1.recipeStepSchema, recipeStep_model_1.RecipeStepModel.config(sequelize));
    recipeStepIngredient_model_1.RecipeStepIngredientModel.init(recipeStepIngredient_model_1.recipeStepIngredientSchema, recipeStepIngredient_model_1.RecipeStepIngredientModel.config(sequelize));
    product_model_1.ProductModel.init(product_model_1.productSchema, product_model_1.ProductModel.config(sequelize));
    saleItemCategory_model_1.SaleItemCategoryModel.init(saleItemCategory_model_1.saleItemCategorySchema, saleItemCategory_model_1.SaleItemCategoryModel.config(sequelize));
    saleItem_model_1.SaleItemModel.init(saleItem_model_1.saleItemSchema, saleItem_model_1.SaleItemModel.config(sequelize));
    saleItemProduct_model_1.SaleItemProductModel.init(saleItemProduct_model_1.saleItemProductSchema, saleItemProduct_model_1.SaleItemProductModel.config(sequelize));
    productModifier_model_1.ProductModifierModel.init(productModifier_model_1.productModifierSchema, productModifier_model_1.ProductModifierModel.config(sequelize));
    modifierGroup_model_1.ModifierGroupModel.init(modifierGroup_model_1.modifierGroupSchema, modifierGroup_model_1.ModifierGroupModel.config(sequelize));
    modifierElementUpgrade_model_1.ModifierElementUpgradeModel.init(modifierElementUpgrade_model_1.modifierElementUpgradeSchema, modifierElementUpgrade_model_1.ModifierElementUpgradeModel.config(sequelize));
    modifierElement_model_1.ModifierElementModel.init(modifierElement_model_1.modifierElementSchema, modifierElement_model_1.ModifierElementModel.config(sequelize));
    brand_model_1.BrandModel.init(brand_model_1.brandSchema, brand_model_1.BrandModel.config(sequelize));
    productRecipe_model_1.ProductRecipeModel.init(productRecipe_model_1.productRecipeSchema, productRecipe_model_1.ProductRecipeModel.config(sequelize));
    productReference_model_1.ProductReferenceModel.init(productReference_model_1.productReferenceSchema, productReference_model_1.ProductReferenceModel.config(sequelize));
    menu_model_1.MenuModel.init(menu_model_1.menuSchema, menu_model_1.MenuModel.config(sequelize));
    itemPrice_model_1.ItemPriceModel.init(itemPrice_model_1.itemPriceSchema, itemPrice_model_1.ItemPriceModel.config(sequelize));
    upgradeElementPrice_model_1.UpgradeElementPriceModel.init(upgradeElementPrice_model_1.upgradeElementPriceSchema, upgradeElementPrice_model_1.UpgradeElementPriceModel.config(sequelize));
    elementPrice_model_1.ElementPriceModel.init(elementPrice_model_1.elementPriceSchema, elementPrice_model_1.ElementPriceModel.config(sequelize));
    inputCategory_model_1.InputCategoryModel.associate(sequelize.models);
    ingredientCategory_model_1.IngredientCategoryModel.associate(sequelize.models);
    ingredient_model_1.IngredientModel.associate(sequelize.models);
    provider_model_1.ProviderModel.associate(sequelize.models);
    preparationStep_model_1.PreparationStepModel.associate(sequelize.models);
    input_model_1.InputModel.associate(sequelize.models);
    measure_model_1.MeasureModel.associate(sequelize.models);
    magnitude_model_1.MagnitudeModel.associate(sequelize.models);
    inventory_model_1.InventoryModel.associate(sequelize.models);
    recipe_model_1.RecipeModel.associate(sequelize.models);
    recipeStep_model_1.RecipeStepModel.associate(sequelize.models);
    product_model_1.ProductModel.associate(sequelize.models);
    saleItemCategory_model_1.SaleItemCategoryModel.associate(sequelize.models);
    saleItem_model_1.SaleItemModel.associate(sequelize.models);
    saleItemProduct_model_1.SaleItemProductModel.associate(sequelize.models);
    modifierElement_model_1.ModifierElementModel.associate(sequelize.models);
    modifierGroup_model_1.ModifierGroupModel.associate(sequelize.models);
    brand_model_1.BrandModel.associate(sequelize.models);
    providerInput_model_1.ProviderInputModel.associate(sequelize.models);
    preparationStepInput_Model_1.PreparationStepInputModel.associate(sequelize.models);
    recipeStepIngredient_model_1.RecipeStepIngredientModel.associate(sequelize.models);
    productModifier_model_1.ProductModifierModel.associate(sequelize.models);
    productRecipe_model_1.ProductRecipeModel.associate(sequelize.models);
    modifierElementUpgrade_model_1.ModifierElementUpgradeModel.associate(sequelize.models);
    // ProductReferenceModel.associate(sequelize.models)
    yield magnitude_model_1.MagnitudeModel.sync();
    yield measure_model_1.MeasureModel.sync();
    yield ingredientCategory_model_1.IngredientCategoryModel.sync();
    yield ingredient_model_1.IngredientModel.sync();
    yield inputCategory_model_1.InputCategoryModel.sync();
    yield input_model_1.InputModel.sync();
    yield preparationStep_model_1.PreparationStepModel.sync();
    yield preparationStepInput_Model_1.PreparationStepInputModel.sync();
    yield inventory_model_1.InventoryModel.sync();
    yield inventoryInput_model_1.InventoryInputModel.sync();
    yield provider_model_1.ProviderModel.sync();
    yield brand_model_1.BrandModel.sync();
    yield providerInput_model_1.ProviderInputModel.sync();
    yield product_model_1.ProductModel.sync();
    yield recipe_model_1.RecipeModel.sync();
    yield recipeStep_model_1.RecipeStepModel.sync();
    yield recipeStepIngredient_model_1.RecipeStepIngredientModel.sync();
    yield saleItemCategory_model_1.SaleItemCategoryModel.sync();
    yield saleItem_model_1.SaleItemModel.sync();
    yield saleItemProduct_model_1.SaleItemProductModel.sync();
    yield modifierGroup_model_1.ModifierGroupModel.sync();
    yield modifierElement_model_1.ModifierElementModel.sync();
    yield productModifier_model_1.ProductModifierModel.sync();
    yield productRecipe_model_1.ProductRecipeModel.sync();
    yield productReference_model_1.ProductReferenceModel.sync();
    yield modifierElementUpgrade_model_1.ModifierElementUpgradeModel.sync();
    yield menu_model_1.MenuModel.sync();
    yield itemPrice_model_1.ItemPriceModel.sync();
    yield upgradeElementPrice_model_1.UpgradeElementPriceModel.sync();
    yield elementPrice_model_1.ElementPriceModel.sync();
    function runMigrations() {
        return __awaiter(this, void 0, void 0, function* () {
            const umzug = new umzug_1.Umzug({
                migrations: { glob: 'migrations/*.js' },
                context: sequelize.getQueryInterface(),
                storage: new umzug_1.SequelizeStorage({ sequelize }),
                logger: console,
            });
            const migrations = yield umzug.pending();
            if (migrations.length > 0) {
                umzug
                    .up()
                    .then((result) => {
                    console.log('Migrations executed successfully.', result);
                })
                    .catch((error) => {
                    console.error('Error executing migrations:', error);
                });
            }
        });
    }
    runMigrations();
});
exports.setUpModels = setUpModels;
