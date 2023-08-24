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
exports.getProviderInputsByProviderId = exports.getProviderInputsByInputId = exports.getProviderInputByProviderIdAndInputIdAndBrandId = exports.recoveryProviderInput = exports.deleteProviderInput = exports.updateProviderInput = exports.saveProviderInput = exports.getProviderInputById = void 0;
const providerInput_model_1 = require("../../db/models/providerInput.model");
const providerInput_factory_1 = require("../../factories/providerInput.factory");
const providerInput_validator_1 = require("../../validations/providerInput.validator");
const timeManager_1 = require("../../utils/timeManager");
const getProviderInputById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield providerInput_model_1.ProviderInputModel.findByPk(id);
    if (response === null)
        throw new Error('ProviderInput not found');
    return yield (0, providerInput_factory_1.toNewProviderInput)(response);
});
exports.getProviderInputById = getProviderInputById;
const saveProviderInput = (providerInput) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, providerInput_validator_1.newProviderInputIsValid)(providerInput);
    const now = (0, timeManager_1.getNow)();
    providerInput.createdAt = now;
    providerInput.updatedAt = now;
    return yield providerInput_model_1.ProviderInputModel.create(providerInput);
});
exports.saveProviderInput = saveProviderInput;
const updateProviderInput = (providerInput, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, providerInput_validator_1.newProviderInputIsValid)(Object.assign(Object.assign({}, providerInput), { id }));
    const now = (0, timeManager_1.getNow)();
    providerInput.updatedAt = now;
    yield providerInput_model_1.ProviderInputModel.update(providerInput, { where: { id } });
    return yield (0, exports.getProviderInputById)(id);
});
exports.updateProviderInput = updateProviderInput;
const deleteProviderInput = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const providerInput = yield (0, exports.getProviderInputById)(id);
    providerInput.delete = true;
    return yield (0, exports.updateProviderInput)(providerInput, id);
});
exports.deleteProviderInput = deleteProviderInput;
const recoveryProviderInput = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const providerInput = yield (0, exports.getProviderInputById)(id);
    providerInput.delete = false;
    return yield (0, exports.updateProviderInput)(providerInput, id);
});
exports.recoveryProviderInput = recoveryProviderInput;
const getProviderInputByProviderIdAndInputIdAndBrandId = (id, providerId, inputId, brandId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield providerInput_model_1.ProviderInputModel.findOne({ where: { providerId, inputId, brandId } });
    if (response !== null && response.id !== id) {
        return yield (0, providerInput_factory_1.toNewProviderInput)(response);
    }
    return null;
});
exports.getProviderInputByProviderIdAndInputIdAndBrandId = getProviderInputByProviderIdAndInputIdAndBrandId;
const getProviderInputsByInputId = (inputId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield providerInput_model_1.ProviderInputModel.findAll({
        where: {
            inputId, delete: false
        },
        include: [
            {
                association: 'provider',
                where: { delete: false }
            },
            {
                association: 'brand',
                where: { delete: false }
            },
            {
                association: 'measure',
                where: { delete: false }
            }
        ]
    });
    if (response === null)
        throw new Error('ProviderInput not found');
    return yield (0, providerInput_factory_1.toNewProviderInputs)(response);
});
exports.getProviderInputsByInputId = getProviderInputsByInputId;
const getProviderInputsByProviderId = (providerId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield providerInput_model_1.ProviderInputModel.findAll({
        where: {
            providerId, delete: false
        },
        include: [
            {
                association: 'input',
                where: { delete: false }
            },
            {
                association: 'brand',
                where: { delete: false }
            },
            {
                association: 'measure',
                where: { delete: false }
            }
        ]
    });
    if (response === null)
        throw new Error('ProviderInput not found');
    return yield (0, providerInput_factory_1.toNewProviderInputs)(response);
});
exports.getProviderInputsByProviderId = getProviderInputsByProviderId;
