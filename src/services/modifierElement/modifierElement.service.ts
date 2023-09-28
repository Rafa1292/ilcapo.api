import { ModifierElement, ModifierElementAttributes } from './modifierElement.types'
import { ModifierElementModel } from '../../db/models/modifierElement.model'
import { Transaction } from 'sequelize'
import { deleteElementPrice, saveElementPrice, updateElementPrice } from '../elementPrice/elementPrice.service'
import {
  deleteModifierElementUpgradeByModifierElementId,
  saveModifierElementUpgrade,
  updateModifierElementUpgrade,
} from '../modifierElementUpgrade/modifierElementUpgrade.service'
import { ModifierElementUpgrade } from '../modifierElementUpgrade/modifierElementUpgrade.types'

export const getModifierElements = async (): Promise<ModifierElement[]> => {
  return await ModifierElementModel.findAll({
    where: {
      delete: false,
    },
    include: [
      {
        association: 'modifierUpgrade',
      },
    ],
  })
}

export const getModifierElementByName = async (name: string, id: number): Promise<ModifierElement | undefined> => {
  const objs = await ModifierElementModel.findAll({})
  const obj = objs.find((tmp: ModifierElement) => {
    return tmp.name.toLowerCase() === name.toLowerCase() && tmp.id !== id
  })
  return obj
}


export const getModifierElementsWithDeletedItems = async (modifierGroupId: number): Promise<ModifierElement[]> => {
  const modifierelements = await ModifierElementModel.findAll()
  return modifierelements.filter((modifierElement) => modifierElement.modifierGroupId === modifierGroupId)
}

export const getModifierElementById = async (id: number): Promise<ModifierElement> => {
  const modifierElement = await ModifierElementModel.findByPk(id, {
    include: ['modifierUpgrade', 'productReference', 'prices'],
  })
  if (modifierElement === null) throw new Error('ModifierElement not found')
  return modifierElement
}

export const saveModifierElement = async (modifierElement: ModifierElement): Promise<ModifierElement> => {
  const transaction = await ModifierElementModel.sequelize?.transaction()
  if (!transaction) throw new Error('Transaction not found')
  try {
    const { id, ...rest } = ModifierElementModel.getModifierElement(modifierElement, 0)
    const newModifierElement = await ModifierElementModel.create(rest, { transaction })
    if (modifierElement.modifierUpgrade)
      await saveModifierElementUpgrade(
        {
          ...modifierElement.modifierUpgrade,
          modifierElementId: newModifierElement.id,
        },
        transaction
      )

    await savePrices(
      {
        id: newModifierElement.id,
        prices: modifierElement.prices,
      } as ModifierElement,
      transaction
    )
    await transaction.commit()
    return await getModifierElementById(newModifierElement.id)
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const updateModifierElement = async (
  modifierElement: Partial<ModifierElementAttributes>,
  id: number
): Promise<void> => {
  const transaction = await ModifierElementModel.sequelize?.transaction()
  if (!transaction) throw new Error('Transaction not found')
  try {
    const updateModifierElement = ModifierElementModel.getPartialModifierElement(modifierElement, 0)
    await ModifierElementModel.update(updateModifierElement, { where: { id } })
    const { prices, ...currentModifierElement } = await getModifierElementById(id)

    if (modifierElement.modifierUpgrade) await saveUpgrade(modifierElement.modifierUpgrade, id, transaction)

    const pricesToUpdate = modifierElement.prices?.filter((price) => prices?.some((p) => p.id === price.id)) || []
    const pricesToRemove = prices?.filter((price) => !modifierElement.prices?.some((p) => p.id === price.id)) || []

    const pricesToSave = modifierElement.prices?.filter((price) => price.id === 0) || []

    if (pricesToRemove?.length > 0)
      await removePrices({ ...currentModifierElement, prices: pricesToRemove }, transaction)
    if (pricesToUpdate?.length > 0)
      await updatePrices({ ...currentModifierElement, prices: pricesToUpdate }, transaction)
    if (pricesToSave?.length > 0) await savePrices({ ...currentModifierElement, prices: pricesToSave }, transaction)
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const saveUpgrade = async (
  modifierElementUpgrade: ModifierElementUpgrade,
  id: number,
  transaction: Transaction
): Promise<void> => {
  if (modifierElementUpgrade.id === undefined) {
    await deleteModifierElementUpgradeByModifierElementId(id)
  } else {
    if (modifierElementUpgrade.id === 0) {
      await saveModifierElementUpgrade(
        {
          ...modifierElementUpgrade,
          modifierElementId: id,
        },
        transaction
      )
    } else {
      await updateModifierElementUpgrade(modifierElementUpgrade, modifierElementUpgrade.id)
    }
  }
}

export const deleteModifierElement = async (id: number): Promise<void> => {
  await updateModifierElement({ delete: true }, id)
}

export const recoveryModifierElement = async (id: number): Promise<void> => {
  await updateModifierElement({ delete: false }, id)
}

const savePrices = async (modifierElement: ModifierElement, transaction: Transaction): Promise<void> => {
  if (modifierElement.prices === undefined) throw new Error('Prices undefined')
  for (const price of modifierElement.prices) {
    await saveElementPrice({ ...price, elementId: modifierElement.id }, transaction)
  }
}

const updatePrices = async (modifierElement: ModifierElement, transaction: Transaction): Promise<void> => {
  if (modifierElement.prices === undefined) throw new Error('Prices undefined')
  for (const price of modifierElement.prices) {
    await updateElementPrice({ ...price, elementId: modifierElement.id }, price.id, transaction)
  }
}

const removePrices = async (modifierElement: ModifierElement, transaction: Transaction): Promise<void> => {
  if (modifierElement.prices === undefined) throw new Error('Prices undefined')
  for (const price of modifierElement.prices) {
    await deleteElementPrice(price.id, transaction)
  }
}
