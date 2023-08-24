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
exports.savePreparationStepInputs = exports.deletePreparationStepInput = exports.updatePreparationStepInput = exports.savePreparationStepInput = void 0;
const preparationStepInput_Model_1 = require("../../db/models/preparationStepInput.Model");
const timeManager_1 = require("../../utils/timeManager");
const savePreparationStepInput = (preparationStepInput) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    preparationStepInput.createdAt = now;
    preparationStepInput.updatedAt = now;
    return yield preparationStepInput_Model_1.PreparationStepInputModel.create(preparationStepInput);
});
exports.savePreparationStepInput = savePreparationStepInput;
const updatePreparationStepInput = (preparationStepInput, id) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    preparationStepInput.updatedAt = now;
    yield preparationStepInput_Model_1.PreparationStepInputModel.update(preparationStepInput, { where: { id } });
});
exports.updatePreparationStepInput = updatePreparationStepInput;
const deletePreparationStepInput = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield preparationStepInput_Model_1.PreparationStepInputModel.destroy({ where: { id } });
});
exports.deletePreparationStepInput = deletePreparationStepInput;
const savePreparationStepInputs = (preparationStepInputs, preparationStepId) => __awaiter(void 0, void 0, void 0, function* () {
    for (const preparationStepInput of preparationStepInputs) {
        const { id } = preparationStepInput, rest = __rest(preparationStepInput, ["id"]);
        yield (0, exports.savePreparationStepInput)(Object.assign(Object.assign({}, rest), { preparationStepId }));
    }
});
exports.savePreparationStepInputs = savePreparationStepInputs;
