/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from "express";
import * as menuService from "../services/menu/menu.service";
import * as menuFactory from "../factories/menu.factory";
import * as responseFactory from "../factories/response.factory";
import { errorHandler } from "../utils/errorHandler";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse();
  try {
    const menuModels = await menuService.getMenus();
    const menus = await menuFactory.validateMenus(menuModels);
    response.setResponse(
      menus,
      ["Menus retrieved successfully"],
      false
    );
  } catch (error) {
    const errors = errorHandler(error);
    response.setResponse([], errors, true);
  }
  res.send(response);
});

router.patch('/recovery/:id', async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse()
  try {
    const id = parseInt(req.params.id)
     await menuService.recoveryMenu(id)
    response.setResponse({}, ['Menu recovery successfully'], false)
  } catch (error) {
    const errors = errorHandler(error)
    response.setResponse(undefined, errors, true)
  }
  res.json(response)
})

router.get("/:id", async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse();
  try {
    const id = parseInt(req.params.id);
    const menuModel = await menuService.getMenuById(id);
    const menu = await menuFactory.validateMenu(menuModel);
    response.setResponse(
      menu,
      ["Menu retrieved successfully"],
      false
    );
  } catch (error) {
    const errors = errorHandler(error);
    response.setResponse([], errors, true);
  }
  res.send(response);
});

router.post("/", async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse();
  try {
    const createMenu = await menuFactory.validateMenu(req.body);
    const savedMenu = await menuService.saveMenu(createMenu);
    response.setResponse(savedMenu, ["Menu saved successfully"], false);
  } catch (error: any) {
    const errors = errorHandler(error);
    response.setResponse([], errors, true);
  }
  res.send(response);
});

router.patch("/:id", async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse();
  try {
    const id = parseInt(req.params.id);
    const updateMenu = await menuFactory.validatePartialMenu({...req.body, id});
    const updatedMenu = await menuService.updateMenu(updateMenu);
    response.setResponse(updatedMenu, ["Menu updated successfully"], false);
  } catch (error: any) {
    const errors = errorHandler(error);
    response.setResponse([], errors, true);
  }
  res.send(response);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const response = responseFactory.toNewCustomResponse();
  try {
    const id = parseInt(req.params.id);
    await menuService.deleteMenu(id);
    response.setResponse({}, ["Menu deleted successfully"], false);
  } catch (error) {
    const errors = errorHandler(error);
    response.setResponse([], errors, true);
  }
  res.send(response);
});

export default router;