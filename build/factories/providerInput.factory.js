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
exports.toNewProviderInputs = exports.toNewProviderInput = void 0;
const toNewProviderInput = (providerInput) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        id: providerInput.id,
        createdBy: providerInput.createdBy,
        updatedBy: providerInput.updatedBy,
        measureId: providerInput.measureId,
        lowerPrice: providerInput.lowerPrice,
        upperPrice: providerInput.upperPrice,
        currentPrice: providerInput.currentPrice,
        lastPrice: providerInput.lastPrice,
        expectedPrice: providerInput.expectedPrice,
        presentation: providerInput.presentation,
        createdAt: providerInput.createdAt,
        updatedAt: providerInput.updatedAt,
        delete: providerInput.delete,
        inputId: providerInput.inputId,
        providerId: providerInput.providerId,
        brandId: providerInput.brandId,
        provider: providerInput.provider,
        measure: providerInput.measure,
        brand: providerInput.brand,
        input: providerInput.input
    };
});
exports.toNewProviderInput = toNewProviderInput;
const toNewProviderInputs = (providerInputs) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(providerInputs.map((providerInput) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, exports.toNewProviderInput)(providerInput);
    })));
});
exports.toNewProviderInputs = toNewProviderInputs;
