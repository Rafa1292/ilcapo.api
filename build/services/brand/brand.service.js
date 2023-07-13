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
exports.recoveryInputCategory = exports.deleteInputCategory = exports.updateBrand = exports.saveBrand = exports.getBrandById = exports.getBrands = void 0;
const brand_model_1 = require("../../db/models/brand.model");
const inputCategory_factory_1 = require("../../factories/inputCategory.factory");
const getBrands = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield brand_model_1.BrandModel.findAll({
        where: {
            delete: false
        }
    });
});
exports.getBrands = getBrands;
const getBrandById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield brand_model_1.BrandModel.findByPk(id);
    if (response === null)
        throw new Error('Brand not found');
    if (response.delete)
        throw new Error('Brand deleted');
    return yield (0, inputCategory_factory_1.toNewInputCategory)(response);
});
exports.getBrandById = getBrandById;
const saveBrand = (brand) => __awaiter(void 0, void 0, void 0, function* () {
    return yield brand_model_1.BrandModel.create(brand);
});
exports.saveBrand = saveBrand;
const updateBrand = (brand, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield brand_model_1.BrandModel.update(brand, { where: { id } });
});
exports.updateBrand = updateBrand;
const deleteInputCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = yield (0, exports.getBrandById)(id);
    brand.delete = true;
    yield (0, exports.updateBrand)(brand, id);
});
exports.deleteInputCategory = deleteInputCategory;
const recoveryInputCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = yield (0, exports.getBrandById)(id);
    brand.delete = false;
    yield (0, exports.updateBrand)(brand, id);
});
exports.recoveryInputCategory = recoveryInputCategory;
