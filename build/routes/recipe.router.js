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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const recipeService = __importStar(require("../services/recipe/recipe.service"));
const recipeFactory = __importStar(require("../factories/recipe.factory"));
const responseFactory = __importStar(require("../factories/response.factory"));
const errorHandler_1 = require("../utils/errorHandler");
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        response.setResponse(yield recipeService.getRecipes(), ['Recipes retrieved successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse([], errors, true);
    }
    res.send(response);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        const recipe = yield recipeService.getRecipeById(id);
        if (recipe !== undefined) {
            response.setResponse(recipe, ['Recipe retrieved successfully'], false);
        }
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const _a = yield recipeFactory.toNewRecipe(req.body), { id } = _a, createRecipe = __rest(_a, ["id"]);
        const savedRecipe = yield recipeService.saveRecipe(createRecipe);
        response.setResponse(savedRecipe, ['Recipe saved successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        const recipe = yield recipeFactory.toNewRecipe(req.body);
        const savedRecipe = yield recipeService.updateRecipe(recipe, id);
        response.setResponse(savedRecipe, ['Recipe updated successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = responseFactory.toNewCustomResponse();
    try {
        const id = parseInt(req.params.id);
        const deletedRecipe = yield recipeService.deleteRecipe(id);
        response.setResponse(deletedRecipe, ['Recipe deleted successfully'], false);
    }
    catch (error) {
        const errors = (0, errorHandler_1.errorHandler)(error);
        response.setResponse(undefined, errors, true);
    }
    res.json(response);
}));
exports.default = router;
