import { ModifierElementUpgrade } from './modifierElementUpgrade.types'
import { ModifierElementUpgradeModel } from '../../db/models/modifierElementUpgrade.model'
import { newModifierElementUpgradeIsValid } from '../../validations/modifierElementUpgrade.validator'
import { Transaction } from 'sequelize'
import {
  deleteUpgradeElementPrice,
  saveUpgradeElementPrice,
  updateUpgradeElementPrice,
} from '../upgradeElementPrice/upgradeElementPrice.service'
import { getNow } from '../../utils/timeManager'

export const saveModifierElementUpgrade = async (
  modifierElementUpgrade: ModifierElementUpgrade,
  transaction: Transaction
): Promise<void> => {
  const isValid = await newModifierElementUpgradeIsValid(modifierElementUpgrade)
  if (isValid) {
    console.log(1, '-------is valid-----')
    const { id, ...rest } = modifierElementUpgrade
    const now = getNow()
    rest.createdAt = now
    rest.updatedAt = now
    const newModifierElementUpgrade = await ModifierElementUpgradeModel.create(
      rest,
      { transaction }
    )
    await savePrices(
      {
        id: newModifierElementUpgrade.id,
        prices: modifierElementUpgrade.prices,
      } as ModifierElementUpgrade,
      transaction,
      newModifierElementUpgrade.id
    )
  }
}

const getModifierElementUpgradeById = async (
  id: number
): Promise<ModifierElementUpgrade> => {
  const response = await ModifierElementUpgradeModel.findByPk(id, {
    include: ['prices'],
  })
  if (response === null) throw new Error('ModifierElementUpgrade not found')
  return response
}

export const updateModifierElementUpgrade = async (
  modifierElementUpgrade: Partial<ModifierElementUpgrade>,
  id: number
): Promise<void> => {
  const transaction = await ModifierElementUpgradeModel.sequelize?.transaction()
  if (!transaction) throw new Error('Transaction not found')
  try {
    const now = getNow()
    modifierElementUpgrade.updatedAt = now
    await ModifierElementUpgradeModel.update(modifierElementUpgrade, {
      where: { id },
    })
    const { prices, ...currentModifierElementUpgrade } =
      await getModifierElementUpgradeById(id)
    const pricesToUpdate =
      modifierElementUpgrade.prices?.filter((price) =>
        prices?.some((currentPrice) => currentPrice.id === price.id)
      ) || []
    const pricesToRemove =
      prices?.filter(
        (price) =>
          !modifierElementUpgrade.prices?.some((p) => p.id === price.id)
      ) || []
    const pricesToSave =
      modifierElementUpgrade.prices?.filter((price) => price.id === 0) || []

    if (pricesToRemove.length > 0)
      await removePrices(
        { ...currentModifierElementUpgrade, prices: pricesToRemove },
        transaction
      )

    if (pricesToUpdate.length > 0)
      await updatePrices(
        { ...currentModifierElementUpgrade, prices: pricesToUpdate },
        transaction
      )

    if (pricesToSave.length > 0)
      await savePrices(
        { ...currentModifierElementUpgrade, prices: pricesToSave },
        transaction,
        id
      )

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const deleteModifierElementUpgradeByModifierElementId = async (
  modifierElementId: number
): Promise<void> => {
  await ModifierElementUpgradeModel.destroy({ where: { modifierElementId } })
}

export const getModifierElementUpgradeByModiifierElementId = async (
  modifierElementId: number
): Promise<ModifierElementUpgrade | null> => {
  const response = await ModifierElementUpgradeModel.findOne({
    where: { modifierElementId },
  })

  return response
}

const savePrices = async (
  modifierElementUpgrade: ModifierElementUpgrade,
  transaction: Transaction,
  id: number
): Promise<void> => {
  for (const price of modifierElementUpgrade.prices) {
    console.log(10, '-------upgradeid-----', id)
    await saveUpgradeElementPrice(
      { ...price, upgradeId: id },
      transaction
    )
  }
}

const updatePrices = async (
  modifierElementUpgrade: ModifierElementUpgrade,
  transaction: Transaction
): Promise<void> => {
  for (const price of modifierElementUpgrade.prices) {
    await updateUpgradeElementPrice(
      { ...price, upgradeId: modifierElementUpgrade.id },
      price.id,
      transaction
    )
  }
}

const removePrices = async (
  modifierElementUpgrade: ModifierElementUpgrade,
  transaction: Transaction
): Promise<void> => {
  for (const price of modifierElementUpgrade.prices) {
    await deleteUpgradeElementPrice(price.id, transaction)
  }
}
