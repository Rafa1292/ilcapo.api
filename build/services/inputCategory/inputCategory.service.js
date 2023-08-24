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
exports.recoveryInputCategory = exports.deleteInputCategory = exports.updateInputCategory = exports.saveInputCategory = exports.getInputCategoryById = exports.getInputCategoriesWithDeletedItems = exports.getInputCategories = void 0;
const inputCategory_model_1 = require("../../db/models/inputCategory.model");
const inputCategory_factory_1 = require("../../factories/inputCategory.factory");
const timeManager_1 = require("../../utils/timeManager");
const getInputCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield inputCategory_model_1.InputCategoryModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                association: 'inputs'
            }
        ]
    });
});
exports.getInputCategories = getInputCategories;
const getInputCategoriesWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield inputCategory_model_1.InputCategoryModel.findAll();
});
exports.getInputCategoriesWithDeletedItems = getInputCategoriesWithDeletedItems;
const getInputCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield inputCategory_model_1.InputCategoryModel.findByPk(id);
    if (response === null)
        throw new Error('InputCategory not found');
    if (response.delete)
        throw new Error('InputCategory deleted');
    return yield (0, inputCategory_factory_1.toNewInputCategory)(response);
});
exports.getInputCategoryById = getInputCategoryById;
const saveInputCategory = (inputCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    inputCategory.createdAt = now;
    inputCategory.updatedAt = now;
    return yield inputCategory_model_1.InputCategoryModel.create(inputCategory);
});
exports.saveInputCategory = saveInputCategory;
const updateInputCategory = (inputCategory, id) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timeManager_1.getNow)();
    inputCategory.updatedAt = now;
    yield inputCategory_model_1.InputCategoryModel.update(inputCategory, { where: { id } });
});
exports.updateInputCategory = updateInputCategory;
const deleteInputCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const inputCategory = yield (0, exports.getInputCategoryById)(id);
    const now = (0, timeManager_1.getNow)();
    inputCategory.updatedAt = now;
    inputCategory.delete = true;
    yield (0, exports.updateInputCategory)(inputCategory, id);
});
exports.deleteInputCategory = deleteInputCategory;
const recoveryInputCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const inputCategory = yield (0, exports.getInputCategoryById)(id);
    const now = (0, timeManager_1.getNow)();
    inputCategory.updatedAt = now;
    inputCategory.delete = false;
    yield (0, exports.updateInputCategory)(inputCategory, id);
});
exports.recoveryInputCategory = recoveryInputCategory;
