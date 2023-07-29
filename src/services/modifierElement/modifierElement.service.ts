import { ModifierElement, NewModifierElement } from './modifierElement.types'
import { ModifierElementModel } from '../../db/models/modifierElement.model'
import { toNewModifierElement } from '../../factories/modifierElement.factory'
import { Transaction } from 'sequelize'
import {
  deleteElementPrice,
  saveElementPrice,
  updateElementPrice,
} from '../elementPrice/elementPrice.service'

export const getModifierElements = async (): Promise<ModifierElement[]> => {
  return await ModifierElementModel.findAll({
    where: {
      delete: false,
    },
    include: [
      {
        association: 'modifierElementUpgrade',
      },
    ],
  })
}

export const getModifierElementsWithDeletedItems = async (
  modifierGroupId: number
): Promise<ModifierElement[]> => {
  const modifierelements = await ModifierElementModel.findAll()
  return modifierelements.filter(
    (modifierElement) => modifierElement.modifierGroupId === modifierGroupId
  )
}

export const getModifierElementById = async (
  id: number
): Promise<ModifierElement> => {
  const response = await ModifierElementModel.findByPk(id, {
    include: ['modifierUpgrade', 'productReference'],
  })
  if (response === null) throw new Error('ModifierElement not found')
  return await toNewModifierElement(response)
}

export const saveModifierElement = async (
  modifierElement: NewModifierElement
): Promise<ModifierElement> => {
  const transaction = await ModifierElementModel.sequelize?.transaction()
  if (!transaction) throw new Error('Transaction not found')
  try {
    const newModifierElement = await ModifierElementModel.create(
      modifierElement,
      { transaction }
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
  modifierElement: Partial<ModifierElement>,
  id: number
): Promise<void> => {
  const transaction = await ModifierElementModel.sequelize?.transaction()
  if (!transaction) throw new Error('Transaction not found')
  try {
    await ModifierElementModel.update(modifierElement, { where: { id } })
    const { prices, ...currentModifierElement } = await getModifierElementById(
      id
    )
    const pricesToUpdate =
      modifierElement.prices?.filter((price) =>
        prices?.some((p) => p.id === price.id)
      ) || []
    const pricesToRemove = prices?.filter(
      (price) => !modifierElement.prices?.some((p) => p.id === price.id)
    )
    const pricesToSave =
      modifierElement.prices?.filter((price) => price.id === 0) || []

    if (pricesToRemove?.length > 0)
      await removePrices(
        { ...currentModifierElement, prices: pricesToRemove },
        transaction
      )
    if (pricesToUpdate?.length > 0)
      await updatePrices(
        { ...currentModifierElement, prices: pricesToUpdate },
        transaction
      )
    if (pricesToSave?.length > 0)
      await savePrices(
        { ...currentModifierElement, prices: pricesToSave },
        transaction
      )
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const deleteModifierElement = async (id: number): Promise<void> => {
  await updateModifierElement({ delete: true }, id)
}

export const recoveryModifierElement = async (id: number): Promise<void> => {
  const modifierElement = await getModifierElementById(id)
  modifierElement.delete = false
  await updateModifierElement(modifierElement, id)
}

const savePrices = async (
  modifierElement: ModifierElement,
  transaction: Transaction
): Promise<void> => {
  for (const price of modifierElement.prices) {
    await saveElementPrice(
      { ...price, elementId: modifierElement.id },
      transaction
    )
  }
}

const updatePrices = async (
  modifierElement: ModifierElement,
  transaction: Transaction
): Promise<void> => {
  for (const price of modifierElement.prices) {
    await updateElementPrice(
      { ...price, elementId: modifierElement.id },
      price.id,
      transaction
    )
  }
}

const removePrices = async (
  modifierElement: ModifierElement,
  transaction: Transaction
): Promise<void> => {
  for (const price of modifierElement.prices) {
    await deleteElementPrice(price.id, transaction)
  }
}
