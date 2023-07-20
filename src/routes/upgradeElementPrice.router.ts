/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from "express";
import * as upgradeElementPriceFactory from '../factories/upgradeElementPrice.factory'
import * as upgradeElementPriceService from '../services/upgradeElementPrice/upgradeElementPrice.service'
import * as responseFactory from "../factories/response.factory";
import { errorHandler } from "../utils/errorHandler";

export const upgradeElementPriceRouter = express.Router();

upgradeElementPriceRouter.post(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    const response = responseFactory.toNewCustomResponse();
    try {
      const {id, ... newItemPrice} = await upgradeElementPriceFactory.toNewUpgradeElementPrice(req.body);
      const upgradeElementPrice = await upgradeElementPriceService.saveUpgradeElementPrice(newItemPrice);
      response.setResponse(upgradeElementPrice, ["UpgradeElementPrice saved successfully"], false);
    } catch (error) {
      errorHandler(error);
    }
    res.send(response);
  }
);

upgradeElementPriceRouter.put(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    const response = responseFactory.toNewCustomResponse();
    try {
      const updateupgradeElementPrice = await upgradeElementPriceFactory.toNewUpgradeElementPrice(req.body);
      const updatedUpgradeElementPrice = await upgradeElementPriceService.updateUpgradeElementPrice(updateupgradeElementPrice);
      response.setResponse(updatedUpgradeElementPrice, ["UpgradeElementPrice updated successfully"], false);
    } catch (error) {
      errorHandler(error);
    }
    res.send(response);
  });

  export default upgradeElementPriceRouter;