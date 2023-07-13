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
exports.newProviderInputIsValid = void 0;
const providerInput_service_1 = require("../services/providerInput/providerInput.service");
const newProviderInputIsValid = (ProviderInputParams) => __awaiter(void 0, void 0, void 0, function* () {
    const providerInput = yield (0, providerInput_service_1.getProviderInputByProviderIdAndInputIdAndBrandId)(ProviderInputParams.id, ProviderInputParams.providerId, ProviderInputParams.inputId, ProviderInputParams.brandId);
    if (providerInput !== null) {
        throw new Error('Este proveedor ya tiene este insumo, para activarlo nuevamente dirigete a la sección de proveedores, insumos eliminados y activalo nuevamente');
    }
});
exports.newProviderInputIsValid = newProviderInputIsValid;
