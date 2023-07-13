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
exports.recoveryMeasure = exports.deleteMeasure = exports.updateMeasure = exports.saveMeasure = exports.getMeasureById = exports.getMeasuresWithDeletedItems = exports.getMeasures = void 0;
const measure_model_1 = require("../../db/models/measure.model");
const measure_factory_1 = require("../../factories/measure.factory");
const getMeasures = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield measure_model_1.MeasureModel.findAll({
        where: {
            delete: false
        },
        include: [
            {
                association: 'magnitude'
            }
        ]
    });
});
exports.getMeasures = getMeasures;
const getMeasuresWithDeletedItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield measure_model_1.MeasureModel.findAll();
});
exports.getMeasuresWithDeletedItems = getMeasuresWithDeletedItems;
const getMeasureById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield measure_model_1.MeasureModel.findByPk(id);
    if (response === null)
        throw new Error('Measure not found');
    if (response.delete)
        throw new Error('Measure deleted');
    return yield (0, measure_factory_1.toNewMeasure)(response);
});
exports.getMeasureById = getMeasureById;
const saveMeasure = (measure) => __awaiter(void 0, void 0, void 0, function* () {
    const savedMeasure = yield measure_model_1.MeasureModel.create(measure);
    if (savedMeasure.principalMeasure)
        yield updatePrincipalMeasure(savedMeasure.id, savedMeasure.magnitudeId);
    return yield (0, measure_factory_1.toNewMeasure)(savedMeasure);
});
exports.saveMeasure = saveMeasure;
const updateMeasure = (measure, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield measure_model_1.MeasureModel.update(measure, { where: { id } });
    if (measure.principalMeasure !== undefined && measure.principalMeasure) {
        if (measure.magnitudeId === undefined) {
            const measure = yield (0, exports.getMeasureById)(id);
            yield updatePrincipalMeasure(id, measure.magnitudeId);
        }
        else {
            yield updatePrincipalMeasure(id, measure.magnitudeId);
        }
    }
});
exports.updateMeasure = updateMeasure;
const deleteMeasure = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const measure = yield (0, exports.getMeasureById)(id);
    measure.delete = true;
    yield (0, exports.updateMeasure)(measure, id);
});
exports.deleteMeasure = deleteMeasure;
const recoveryMeasure = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const measure = yield (0, exports.getMeasureById)(id);
    measure.delete = false;
    yield (0, exports.updateMeasure)(measure, id);
});
exports.recoveryMeasure = recoveryMeasure;
const updatePrincipalMeasure = (principalMeasureId, magnitudeId) => __awaiter(void 0, void 0, void 0, function* () {
    const measures = yield (yield (0, exports.getMeasures)()).filter(measure => measure.magnitudeId === magnitudeId && measure.id !== principalMeasureId);
    measures.map((measure) => __awaiter(void 0, void 0, void 0, function* () { return (yield (0, exports.updateMeasure)({ principalMeasure: false }, measure.id)); }));
});
