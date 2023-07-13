"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.toNewIngredients = exports.toNewIngredient = void 0;
const ingredientValidator = __importStar(require("../validations/ingredient.validator"));
const toNewIngredient = (ingredient) => __awaiter(void 0, void 0, void 0, function* () {
    yield ingredientValidator.newIngredientIsValid(ingredient);
    const newIngredient = {
        id: ingredient.id,
        name: ingredient.name,
        measureId: ingredient.measureId,
        ingredientCategoryId: ingredient.ingredientCategoryId,
        cost: ingredient.cost,
        presentation: ingredient.presentation,
        price: ingredient.price,
        measure: ingredient.measure,
        preparationSteps: ingredient.preparationSteps.filter((preparationStep) => !preparationStep.delete),
        createdBy: ingredient.createdBy,
        updatedBy: ingredient.updatedBy,
        createdAt: ingredient.createdAt,
        updatedAt: ingredient.updatedAt,
        delete: ingredient.delete
    };
    return newIngredient;
});
exports.toNewIngredient = toNewIngredient;
const toNewIngredients = (ingredients) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(ingredients.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, exports.toNewIngredient)(ingredient); })));
});
exports.toNewIngredients = toNewIngredients;
