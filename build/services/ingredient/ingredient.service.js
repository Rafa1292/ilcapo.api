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
exports.recoveryIngredient = exports.deleteIngredient = exports.updateIngredient = exports.saveIngredient = exports.getIngredientById = exports.getIngredientsWithDeletedItems = exports.getIngredients = void 0;
const ingredient_model_1 = require("../../db/models/ingredient.model");
const ingredient_factory_1 = require("../../factories/ingredient.factory");
const getIngredients = () => __awaiter(void 0, void 0, void 0, function* () {
    const ingredients = yield ingredient_model_1.IngredientModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                association: 'preparationSteps',
                include: [
                    {
                        association: 'preparationStepInputs',
                        include: [
                            {
                                association: 'input'
                            },
                            {
                                association: 'measure'
                            }
                        ]
                    }
                ]
            },
            'measure'
        ]
    });
    return yield (0, ingredient_factory_1.toNewIngredients)(ingredients);
});
exports.getIngredients = getIngredients;
const getIngredientsWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ingredient_model_1.IngredientModel.findAll();
});
exports.getIngredientsWithDeletedItems = getIngredientsWithDeletedItems;
const getIngredientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ingredient_model_1.IngredientModel.findByPk(id, {
        include: [
            {
                association: 'preparationSteps',
                include: [
                    {
                        association: 'preparationStepInputs',
                        include: [
                            {
                                association: 'input'
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
        throw new Error('Ingredient not found');
    if (response.delete)
        throw new Error('Ingredient deleted');
    return yield (0, ingredient_factory_1.toNewIngredient)(response);
});
exports.getIngredientById = getIngredientById;
const saveIngredient = (ingredient) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ingredient_model_1.IngredientModel.create(ingredient);
});
exports.saveIngredient = saveIngredient;
const updateIngredient = (ingredient, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield ingredient_model_1.IngredientModel.update(ingredient, { where: { id } });
});
exports.updateIngredient = updateIngredient;
const deleteIngredient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredient = yield (0, exports.getIngredientById)(id);
    ingredient.delete = true;
    yield (0, exports.updateIngredient)(ingredient, id);
});
exports.deleteIngredient = deleteIngredient;
const recoveryIngredient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredient = yield (0, exports.getIngredientById)(id);
    ingredient.delete = false;
    yield (0, exports.updateIngredient)(ingredient, id);
});
exports.recoveryIngredient = recoveryIngredient;
