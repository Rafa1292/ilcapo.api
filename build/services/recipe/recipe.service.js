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
exports.recoveryRecipe = exports.deleteRecipe = exports.updateRecipe = exports.saveRecipe = exports.getRecipeById = exports.getRecipesWithDeletedItems = exports.getRecipes = void 0;
const recipe_model_1 = require("../../db/models/recipe.model");
const recipe_factory_1 = require("../../factories/recipe.factory");
const timeManager_1 = require("../../utils/timeManager");
const getRecipes = () => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield recipe_model_1.RecipeModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                association: 'recipeSteps',
                include: [
                    {
                        association: 'recipeStepIngredients',
                        include: [
                            {
                                association: 'ingredient'
                            },
                            {
                                association: 'measure'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    return yield (0, recipe_factory_1.toNewRecipes)(recipes);
});
exports.getRecipes = getRecipes;
const getRecipesWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield recipe_model_1.RecipeModel.findAll();
});
exports.getRecipesWithDeletedItems = getRecipesWithDeletedItems;
const getRecipeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield recipe_model_1.RecipeModel.findByPk(id, {
        include: [
            {
                association: 'recipeSteps',
                include: [
                    {
                        association: 'recipeStepIngredients',
                        include: [
                            {
                                association: 'ingredient'
                            },
                            {
                                association: 'measure'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    if (response === null)
        throw new Error('Recipe not found');
    if (response.delete)
        throw new Error('Recipe deleted');
    console.log(response);
    return yield (0, recipe_factory_1.toNewRecipe)(response);
});
exports.getRecipeById = getRecipeById;
const saveRecipe = (recipe) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    recipe.createdAt = now;
    recipe.updatedAt = now;
    return yield recipe_model_1.RecipeModel.create(recipe);
});
exports.saveRecipe = saveRecipe;
const updateRecipe = (recipe, id) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    recipe.updatedAt = now;
    yield recipe_model_1.RecipeModel.update(recipe, { where: { id } });
});
exports.updateRecipe = updateRecipe;
const deleteRecipe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield (0, exports.getRecipeById)(id);
    recipe.delete = true;
    yield (0, exports.updateRecipe)(recipe, id);
});
exports.deleteRecipe = deleteRecipe;
const recoveryRecipe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield (0, exports.getRecipeById)(id);
    recipe.delete = false;
    yield (0, exports.updateRecipe)(recipe, id);
});
exports.recoveryRecipe = recoveryRecipe;
