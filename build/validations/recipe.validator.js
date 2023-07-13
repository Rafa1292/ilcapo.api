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
exports.newRecipeIsValid = void 0;
const recipe_service_1 = require("../services/recipe/recipe.service");
const validator = __importStar(require("../utils/genericValidators/validator.util"));
const parseName = (name) => {
    if (!validator.isString(name)) {
        throw new Error('Incorrect or missing name:');
    }
    return name;
};
const validateUniqueName = (name, id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield (0, recipe_service_1.getRecipesWithDeletedItems)();
    const recipe = recipes.find((recipe) => recipe.name.toLowerCase() === name.toLowerCase());
    if (recipe !== null && recipe !== undefined) {
        if ((recipe === null || recipe === void 0 ? void 0 : recipe.id) !== id) {
            if (recipe.delete) {
                throw new Error('Este nombre ya existe y fue borrado. Si desea recuperarlo dirigase a la sección de recetas borradas');
            }
            throw new Error('Este nombre de ingrediente ya existe');
        }
    }
});
const newRecipeIsValid = (recipe) => __awaiter(void 0, void 0, void 0, function* () {
    parseName(recipe === null || recipe === void 0 ? void 0 : recipe.name);
    yield validateUniqueName(recipe === null || recipe === void 0 ? void 0 : recipe.name, recipe === null || recipe === void 0 ? void 0 : recipe.id);
    return true;
});
exports.newRecipeIsValid = newRecipeIsValid;
