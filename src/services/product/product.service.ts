import { Product, NewProduct } from './product.types'
import { ProductModel } from '../../db/models/product.model'
import { validateProduct, validateProducts } from '../../factories/product.factory'
import { getNow } from '../../utils/timeManager'

export const getProducts = async (): Promise<Product[]> => {
  const products = await ProductModel.findAll(
    {
      where: {
        delete: false
      },
      include: [
        {
          association: 'productModifiers',
          include: [
            {
              association: 'modifierGroup',
              include: [
                {
                  association: 'elements',
                  include: [
                    'modifierUpgrade'
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  )

  return await validateProducts(products)
}

export const getProductsWithDeletedItems = async (): Promise<Product[]> => {
  return await ProductModel.findAll()
}

export const getProductById = async (id: number): Promise<Product> => {
  const response = await ProductModel.findByPk(id)
  if (response === null) throw new Error('Product not found')
  if (response.delete) throw new Error('Product deleted')
  return await validateProduct(response)
}

export const saveProduct = async (product: NewProduct): Promise<Product> => {
  const now = getNow()
  product.createdAt = now
  product.updatedAt = now
  return await ProductModel.create(product)
}

export const updateProduct = async (product: Partial<Product>, id: number): Promise<void> => {
  console.log(product)
  const now = getNow()
  product.updatedAt = now
  await ProductModel.update(product, { where: { id } })
}

export const deleteProduct = async (id: number): Promise<void> => {
  const product = await getProductById(id)  
  product.delete = true
  await updateProduct(product, id)
}

export const recoveryProduct = async (id: number): Promise<void> => {
  const product = await getProductById(id)
  product.delete = false
  await updateProduct(product, id)
}
