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
exports.stepDown = exports.stepUp = exports.recoveryPreparationStep = exports.deletePreparationStep = exports.updatePreparationStep = exports.savePreparationStep = exports.getPreparationStepById = exports.getPreparationStepsWithDeletedItems = void 0;
const preparationStep_model_1 = require("../../db/models/preparationStep.model");
const preparationStep_factory_1 = require("../../factories/preparationStep.factory");
const timeManager_1 = require("../../utils/timeManager");
const getPreparationStepsWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield preparationStep_model_1.PreparationStepModel.findAll();
});
exports.getPreparationStepsWithDeletedItems = getPreparationStepsWithDeletedItems;
const getPreparationStepsByIngredientId = (ingredientId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield preparationStep_model_1.PreparationStepModel.findAll({ where: { ingredientId, delete: false } });
});
const getPreparationStepById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield preparationStep_model_1.PreparationStepModel.findByPk(id, { include: { all: true } });
    if (response === null)
        throw new Error('PreparationStep not found');
    if (response.delete)
        throw new Error('PreparationStep deleted');
    return yield (0, preparationStep_factory_1.toNewPreparationStep)(response);
});
exports.getPreparationStepById = getPreparationStepById;
const savePreparationStep = (preparationStep) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    preparationStep.createdAt = now;
    preparationStep.updatedAt = now;
    const savedPreparationStep = yield preparationStep_model_1.PreparationStepModel.create(preparationStep);
    yield sortStepsAfterInsert(savedPreparationStep);
    return savedPreparationStep;
});
exports.savePreparationStep = savePreparationStep;
const updatePreparationStep = (preparationStep, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield sortStepsAfterUpdate(preparationStep);
    const now = (0, timeManager_1.getNow)();
    preparationStep.updatedAt = now;
    yield preparationStep_model_1.PreparationStepModel.update(preparationStep, { where: { id } });
});
exports.updatePreparationStep = updatePreparationStep;
const deletePreparationStep = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const preparationStep = yield (0, exports.getPreparationStepById)(id);
    const now = (0, timeManager_1.getNow)();
    yield preparationStep_model_1.PreparationStepModel.update({ delete: true, updatedAt: now }, { where: { id } });
    yield sortStepsAfterDelete(preparationStep);
});
exports.deletePreparationStep = deletePreparationStep;
const recoveryPreparationStep = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const preparationStep = yield (0, exports.getPreparationStepById)(id);
    preparationStep.delete = false;
    yield (0, exports.updatePreparationStep)(preparationStep, id);
});
exports.recoveryPreparationStep = recoveryPreparationStep;
const stepUp = (preparationStep) => __awaiter(void 0, void 0, void 0, function* () {
    if (preparationStep.stepNumber === 1)
        throw new Error('Step number is 1');
    yield (0, exports.updatePreparationStep)(Object.assign(Object.assign({}, preparationStep), { stepNumber: preparationStep.stepNumber - 1 }), preparationStep.id);
});
exports.stepUp = stepUp;
const stepDown = (preparationStep) => __awaiter(void 0, void 0, void 0, function* () {
    const preparationSteps = yield getPreparationStepsByIngredientId(preparationStep.ingredientId);
    if (preparationStep.stepNumber === preparationSteps.length)
        throw new Error('Step number is last');
    yield (0, exports.updatePreparationStep)(Object.assign(Object.assign({}, preparationStep), { stepNumber: preparationStep.stepNumber + 1 }), preparationStep.id);
});
exports.stepDown = stepDown;
const sortStepsAfterInsert = (preparationStep) => __awaiter(void 0, void 0, void 0, function* () {
    if (preparationStep.stepNumber === undefined)
        throw new Error('Step number is undefined');
    if (preparationStep.ingredientId === undefined)
        throw new Error('Ingredient id is undefined');
    const preparationSteps = yield getPreparationStepsByIngredientId(preparationStep.ingredientId);
    const repeatPreparationStep = preparationSteps.find((step) => step.stepNumber === preparationStep.stepNumber && step.id !== preparationStep.id);
    const now = (0, timeManager_1.getNow)();
    if (repeatPreparationStep !== undefined) {
        for (const step of preparationSteps) {
            if (step.stepNumber >= preparationStep.stepNumber && step.id !== preparationStep.id) {
                const stepNumber = step.stepNumber + 1;
                yield preparationStep_model_1.PreparationStepModel.update({ stepNumber, updatedAt: now }, { where: { id: step.id } });
            }
        }
    }
});
const sortStepsAfterDelete = (preparationStep) => __awaiter(void 0, void 0, void 0, function* () {
    if (preparationStep.stepNumber === undefined)
        throw new Error('Step number is undefined');
    if (preparationStep.ingredientId === undefined)
        throw new Error('Ingredient id is undefined');
    const preparationSteps = yield getPreparationStepsByIngredientId(preparationStep.ingredientId);
    const now = (0, timeManager_1.getNow)();
    for (const step of preparationSteps) {
        if (step.stepNumber > preparationStep.stepNumber) {
            const stepNumber = step.stepNumber - 1;
            yield preparationStep_model_1.PreparationStepModel.update({ stepNumber, updatedAt: now }, { where: { id: step.id } });
        }
    }
});
const sortStepsAfterUpdate = (preparationStep) => __awaiter(void 0, void 0, void 0, function* () {
    if (preparationStep.stepNumber === undefined)
        throw new Error('Step number is undefined');
    if (preparationStep.id === undefined)
        throw new Error('Preparation step id is undefined');
    if (preparationStep.ingredientId === undefined)
        throw new Error('Ingredient id is undefined');
    const preparationSteps = yield getPreparationStepsByIngredientId(preparationStep.ingredientId);
    const updatePreparationStep = preparationSteps.find((step) => step.id === preparationStep.id);
    if (updatePreparationStep === undefined)
        throw new Error('Preparation step not found');
    const diference = (updatePreparationStep === null || updatePreparationStep === void 0 ? void 0 : updatePreparationStep.stepNumber) - preparationStep.stepNumber;
    const modifier = diference > 0 ? 1 : -1;
    const index = diference > 0 ? preparationStep.stepNumber : updatePreparationStep.stepNumber;
    const length = diference > 0 ? updatePreparationStep.stepNumber : preparationStep.stepNumber;
    const now = (0, timeManager_1.getNow)();
    for (const step of preparationSteps) {
        if (step.stepNumber >= index && step.stepNumber <= length && step.id !== preparationStep.id) {
            const stepNumber = step.stepNumber + modifier;
            yield preparationStep_model_1.PreparationStepModel.update({ stepNumber, updatedAt: now }, { where: { id: step.id } });
        }
    }
});
