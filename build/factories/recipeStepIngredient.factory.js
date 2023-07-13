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
exports.toNewRecipeStepIngredient = void 0;
const toNewRecipeStepIngredient = (recipeStepIngredient) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        id: recipeStepIngredient.id,
        quantity: recipeStepIngredient.quantity,
        ingredientId: recipeStepIngredient.ingredientId,
        recipeStepId: recipeStepIngredient.recipeStepId,
        measureId: recipeStepIngredient.measureId,
        extra: recipeStepIngredient.extra,
        isOptional: recipeStepIngredient.isOptional,
        createdBy: recipeStepIngredient.createdBy,
        updatedBy: recipeStepIngredient.updatedBy,
        createdAt: recipeStepIngredient.createdAt,
        updatedAt: recipeStepIngredient.updatedAt,
        delete: recipeStepIngredient.delete
    };
});
exports.toNewRecipeStepIngredient = toNewRecipeStepIngredient;
