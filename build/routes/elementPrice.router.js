"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementPriceRouter = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
// import * as elementPriceService from "../services/elementPrice/elementPrice.service";
// import * as elementPriceFactory from "../factories/elementPrice.factory";
// import * as responseFactory from "../factories/response.factory";
// import { errorHandler } from "../utils/errorHandler";
exports.elementPriceRouter = express_1.default.Router();
// elementPriceRouter.post(
//   "/",
//   async (req: Request, res: Response): Promise<void> => {
//     const response = responseFactory.toNewCustomResponse();
//     try {
//       const {id, ... newElementPrice} = await elementPriceFactory.toNewElementPrice(req.body);
//       const elementPrice = await elementPriceService.saveElementPrice(newElementPrice);
//       response.setResponse(elementPrice, ["ElementPrice saved successfully"], false);
//     } catch (error) {
//       errorHandler(error);
//     }
//     res.send(response);
//   }
// );
// elementPriceRouter.put(
//   "/",
//   async (req: Request, res: Response): Promise<void> => {
//     const response = responseFactory.toNewCustomResponse();
//     try {
//       const updateElementPrice = await elementPriceFactory.toNewElementPrice(req.body);
//       const updatedElementPrice = await elementPriceService.updateElementPrice(updateElementPrice);
//       response.setResponse(updatedElementPrice, ["ElementPrice updated successfully"], false);
//     } catch (error) {
//       errorHandler(error);
//     }
//     res.send(response);
//   });
