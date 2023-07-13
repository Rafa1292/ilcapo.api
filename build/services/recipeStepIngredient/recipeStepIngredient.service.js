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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRecipeStepIngredients = exports.deleteRecipeStepIngredient = exports.updateRecipeStepIngredient = exports.saveRecipeStepIngredient = void 0;
const recipeStepIngredient_model_1 = require("../../db/models/recipeStepIngredient.model");
const saveRecipeStepIngredient = (recipeStepIngredient) => __awaiter(void 0, void 0, void 0, function* () {
    return yield recipeStepIngredient_model_1.RecipeStepIngredientModel.create(recipeStepIngredient);
});
exports.saveRecipeStepIngredient = saveRecipeStepIngredient;
const updateRecipeStepIngredient = (recipeStepIngredient, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield recipeStepIngredient_model_1.RecipeStepIngredientModel.update(recipeStepIngredient, { where: { id } });
});
exports.updateRecipeStepIngredient = updateRecipeStepIngredient;
const deleteRecipeStepIngredient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield recipeStepIngredient_model_1.RecipeStepIngredientModel.destroy({ where: { id } });
});
exports.deleteRecipeStepIngredient = deleteRecipeStepIngredient;
const saveRecipeStepIngredients = (recipeStepIngredients, recipeStepId) => __awaiter(void 0, void 0, void 0, function* () {
    for (const recipeStepIngredient of recipeStepIngredients) {
        const { id } = recipeStepIngredient, rest = __rest(recipeStepIngredient, ["id"]);
        yield (0, exports.saveRecipeStepIngredient)(Object.assign(Object.assign({}, rest), { recipeStepId }));
    }
});
exports.saveRecipeStepIngredients = saveRecipeStepIngredients;
