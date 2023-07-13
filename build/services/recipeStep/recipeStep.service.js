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
exports.stepDown = exports.stepUp = exports.recoveryRecipeStep = exports.deleteRecipeStep = exports.updateRecipeStep = exports.saveRecipeStep = exports.getRecipeStepById = exports.getRecipeStepsWithDeletedItems = void 0;
const recipeStep_factory_1 = require("../../factories/recipeStep.factory");
const recipeStep_model_1 = require("../../db/models/recipeStep.model");
const getRecipeStepsWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield recipeStep_model_1.RecipeStepModel.findAll();
});
exports.getRecipeStepsWithDeletedItems = getRecipeStepsWithDeletedItems;
const getRecipeStepsByRecipeId = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield recipeStep_model_1.RecipeStepModel.findAll({ where: { recipeId, delete: false } });
});
const getRecipeStepById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield recipeStep_model_1.RecipeStepModel.findByPk(id, { include: { all: true } });
    if (response === null)
        throw new Error('RecipeStep not found');
    if (response.delete)
        throw new Error('RecipeStep deleted');
    return yield (0, recipeStep_factory_1.toNewRecipeStep)(response);
});
exports.getRecipeStepById = getRecipeStepById;
const saveRecipeStep = (recipeStep) => __awaiter(void 0, void 0, void 0, function* () {
    const savedRecipeStep = yield recipeStep_model_1.RecipeStepModel.create(recipeStep);
    yield sortStepsAfterInsert(savedRecipeStep);
    return savedRecipeStep;
});
exports.saveRecipeStep = saveRecipeStep;
const updateRecipeStep = (recipeStep, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield sortStepsAfterUpdate(recipeStep);
    yield recipeStep_model_1.RecipeStepModel.update(recipeStep, { where: { id } });
});
exports.updateRecipeStep = updateRecipeStep;
const deleteRecipeStep = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeStep = yield (0, exports.getRecipeStepById)(id);
    yield recipeStep_model_1.RecipeStepModel.update({ delete: true }, { where: { id } });
    yield sortStepsAfterDelete(recipeStep);
});
exports.deleteRecipeStep = deleteRecipeStep;
const recoveryRecipeStep = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeStep = yield (0, exports.getRecipeStepById)(id);
    recipeStep.delete = false;
    yield (0, exports.updateRecipeStep)(recipeStep, id);
});
exports.recoveryRecipeStep = recoveryRecipeStep;
const stepUp = (recipeStep) => __awaiter(void 0, void 0, void 0, function* () {
    if (recipeStep.stepNumber === 1)
        throw new Error('Step number is 1');
    yield (0, exports.updateRecipeStep)(Object.assign(Object.assign({}, recipeStep), { stepNumber: recipeStep.stepNumber - 1 }), recipeStep.id);
});
exports.stepUp = stepUp;
const stepDown = (recipeStep) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeSteps = yield getRecipeStepsByRecipeId(recipeStep.recipeId);
    if (recipeStep.stepNumber === recipeSteps.length)
        throw new Error('Step number is last');
    yield (0, exports.updateRecipeStep)(Object.assign(Object.assign({}, recipeStep), { stepNumber: recipeStep.stepNumber + 1 }), recipeStep.id);
});
exports.stepDown = stepDown;
const sortStepsAfterInsert = (recipeStep) => __awaiter(void 0, void 0, void 0, function* () {
    if (recipeStep.stepNumber === undefined)
        throw new Error('Step number is undefined');
    if (recipeStep.recipeId === undefined)
        throw new Error('Recipe id is undefined');
    const recipeSteps = yield getRecipeStepsByRecipeId(recipeStep.recipeId);
    const repeatRecipeStep = recipeSteps.find((step) => step.stepNumber === recipeStep.stepNumber && step.id !== recipeStep.id);
    if (repeatRecipeStep !== undefined) {
        for (const step of recipeSteps) {
            if (step.stepNumber >= recipeStep.stepNumber && step.id !== recipeStep.id) {
                const stepNumber = step.stepNumber + 1;
                yield recipeStep_model_1.RecipeStepModel.update({ stepNumber }, { where: { id: step.id } });
            }
        }
    }
});
const sortStepsAfterDelete = (recipeStep) => __awaiter(void 0, void 0, void 0, function* () {
    if (recipeStep.stepNumber === undefined)
        throw new Error('Step number is undefined');
    if (recipeStep.recipeId === undefined)
        throw new Error('Recipe id is undefined');
    const recipeSteps = yield getRecipeStepsByRecipeId(recipeStep.recipeId);
    for (const step of recipeSteps) {
        if (step.stepNumber > recipeStep.stepNumber) {
            const stepNumber = step.stepNumber - 1;
            yield recipeStep_model_1.RecipeStepModel.update({ stepNumber }, { where: { id: step.id } });
        }
    }
});
const sortStepsAfterUpdate = (recipeStep) => __awaiter(void 0, void 0, void 0, function* () {
    if (recipeStep.stepNumber === undefined)
        throw new Error('Step number is undefined');
    if (recipeStep.id === undefined)
        throw new Error('Recipe step id is undefined');
    if (recipeStep.recipeId === undefined)
        throw new Error('Recipe id is undefined');
    const recipeSteps = yield getRecipeStepsByRecipeId(recipeStep.recipeId);
    const updateRecipeStep = recipeSteps.find((step) => step.id === recipeStep.id);
    if (updateRecipeStep === undefined)
        throw new Error('Recipe step not found');
    const diference = (updateRecipeStep === null || updateRecipeStep === void 0 ? void 0 : updateRecipeStep.stepNumber) - recipeStep.stepNumber;
    const modifier = diference > 0 ? 1 : -1;
    const index = diference > 0 ? recipeStep.stepNumber : updateRecipeStep.stepNumber;
    const length = diference > 0 ? updateRecipeStep.stepNumber : recipeStep.stepNumber;
    for (const step of recipeSteps) {
        if (step.stepNumber >= index && step.stepNumber <= length && step.id !== recipeStep.id) {
            const stepNumber = step.stepNumber + modifier;
            yield recipeStep_model_1.RecipeStepModel.update({ stepNumber }, { where: { id: step.id } });
        }
    }
});
