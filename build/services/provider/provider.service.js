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
exports.recoveryProvider = exports.deleteProvider = exports.updateProvider = exports.saveProvider = exports.getProviderById = exports.getProvidersWithDeletedItems = exports.getProviders = void 0;
const provider_model_1 = require("../../db/models/provider.model");
const provider_factory_1 = require("../../factories/provider.factory");
const getProviders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield provider_model_1.ProviderModel.findAll({
        where: {
            delete: false
        }
    });
});
exports.getProviders = getProviders;
const getProvidersWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield provider_model_1.ProviderModel.findAll();
});
exports.getProvidersWithDeletedItems = getProvidersWithDeletedItems;
const getProviderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield provider_model_1.ProviderModel.findByPk(id);
    if (response === null)
        throw new Error('Provider not found');
    if (response.delete)
        throw new Error('Provider deleted');
    return yield (0, provider_factory_1.toNewProvider)(response);
});
exports.getProviderById = getProviderById;
const saveProvider = (provider) => __awaiter(void 0, void 0, void 0, function* () {
    yield provider_model_1.ProviderModel.create(provider);
});
exports.saveProvider = saveProvider;
const updateProvider = (provider, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield provider_model_1.ProviderModel.update(provider, { where: { id } });
});
exports.updateProvider = updateProvider;
const deleteProvider = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = yield (0, exports.getProviderById)(id);
    provider.delete = true;
    yield (0, exports.updateProvider)(provider, id);
});
exports.deleteProvider = deleteProvider;
const recoveryProvider = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = yield (0, exports.getProviderById)(id);
    provider.delete = false;
    yield (0, exports.updateProvider)(provider, id);
});
exports.recoveryProvider = recoveryProvider;
