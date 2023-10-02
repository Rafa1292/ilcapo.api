import { Product, ProductAttributes } from './product.types'
import { ProductModel } from '../../db/models/product.model'

export const getProducts = async (): Promise<Product[]> => {
  const result = await ProductModel.findAll(
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
  return result

}

export const getProductsWithDeletedItems = async (): Promise<Product[]> => {
  return await ProductModel.findAll()
}

export const getProductById = async (id: number): Promise<Product> => {
  const product = await ProductModel.findByPk(id)
  if (product === null) throw new Error('Product not found')
  if (product.delete) throw new Error('Product deleted')
  return product
}

export const saveProduct = async (product: Product): Promise<Product> => {
  const { id, ...rest } = ProductModel.getProduct(product, 0)
  return await ProductModel.create(rest)
}

export const updateProduct = async (product: Partial<ProductAttributes>, id: number): Promise<void> => {
  const updatedProduct = ProductModel.getPartialProduct(product, id)
  await ProductModel.update(updatedProduct, { where: { id } })
}

export const deleteProduct = async (id: number): Promise<void> => {
  await updateProduct({ delete: true }, id)
}

export const recoveryProduct = async (id: number): Promise<void> => {
  await updateProduct({ delete: false }, id)
}

export const getProductByName = async (name: string, id: number): Promise<Product | undefined> => {
  const objs = await ProductModel.findAll({})
  const obj = objs.find((tmp: Product) => {
    return tmp.name.toLowerCase() === name.toLowerCase() && tmp.id !== id
  })
  return obj
}
