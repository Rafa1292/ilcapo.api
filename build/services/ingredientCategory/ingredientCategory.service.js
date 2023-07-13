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
exports.recoveryIngredientCategory = exports.deleteIngredientCategory = exports.updateIngredientCategory = exports.saveIngredientCategory = exports.getIngredientCategoryById = exports.getIngredientCategoriesWithDeletedItems = exports.getIngredientCategories = void 0;
const ingredientCategory_model_1 = require("../../db/models/ingredientCategory.model");
const ingredientCategory_factory_1 = require("../../factories/ingredientCategory.factory");
const getIngredientCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ingredientCategory_model_1.IngredientCategoryModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                association: 'ingredients'
            }
        ]
    });
});
exports.getIngredientCategories = getIngredientCategories;
const getIngredientCategoriesWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ingredientCategory_model_1.IngredientCategoryModel.findAll();
});
exports.getIngredientCategoriesWithDeletedItems = getIngredientCategoriesWithDeletedItems;
const getIngredientCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ingredientCategory_model_1.IngredientCategoryModel.findByPk(id);
    if (response === null)
        throw new Error('IngredientCategory not found');
    if (response.delete)
        throw new Error('IngredientCategory deleted');
    return yield (0, ingredientCategory_factory_1.toNewIngredientCategory)(response);
});
exports.getIngredientCategoryById = getIngredientCategoryById;
const saveIngredientCategory = (ingredientCategory) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ingredientCategory_model_1.IngredientCategoryModel.create(ingredientCategory);
});
exports.saveIngredientCategory = saveIngredientCategory;
const updateIngredientCategory = (ingredientCategory, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield ingredientCategory_model_1.IngredientCategoryModel.update(ingredientCategory, { where: { id } });
});
exports.updateIngredientCategory = updateIngredientCategory;
const deleteIngredientCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredientCategory = yield (0, exports.getIngredientCategoryById)(id);
    ingredientCategory.delete = true;
    yield (0, exports.updateIngredientCategory)(ingredientCategory, id);
});
exports.deleteIngredientCategory = deleteIngredientCategory;
const recoveryIngredientCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredientCategory = yield (0, exports.getIngredientCategoryById)(id);
    ingredientCategory.delete = false;
    yield (0, exports.updateIngredientCategory)(ingredientCategory, id);
});
exports.recoveryIngredientCategory = recoveryIngredientCategory;
