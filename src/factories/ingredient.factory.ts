import { union, z } from 'zod'
import { Ingredient } from '../services/ingredient/ingredient.types'
import { measureSchema } from './measure.factory'
import { preparationStepSchema } from './preparationStep.factory'
import { getIngredientByName } from '../services/ingredient/ingredient.service'

export const ingredientSchema = z.object({
  id: z.number({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }).default(0),
  name: z.string({
    required_error: 'El nombre de la marca es requerido',
    invalid_type_error: 'El nombre de la marca debe ser  un texto',
  }),
  measureId: z.number({
    required_error: 'La medida es requerida',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  ingredientCategoryId: z.number({
    required_error: 'La categoria es requerida',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  cost: z.number({
    required_error: 'El costo es requerido',
    invalid_type_error: 'El id debe ser un numero entero',
  }),
  presentation: z.number({
    required_error: 'La presentacion es requerida',
    invalid_type_error: 'La presentacion debe ser un numero entero',
  }),
  price: z.number({
    required_error: 'El precio es requerido',
    invalid_type_error: 'El precio debe ser un numero entero',
  }),
  measure: union([measureSchema, z.undefined()]).optional(),
  preparationSteps: z.array(preparationStepSchema).optional(),
})

export const validateIngredient = async (ingredient: any): Promise<Ingredient> => {
  const result = await ingredientSchema.safeParseAsync(ingredient)

  if (!result.success) {
    throw new Error(result.error.message)
  }
  await validateName(result.data.name, result.data.id)


  return result.data
}

export const validatePartialIngredient = async (ingredient: any): Promise<Partial<Ingredient>> => {
  console.log('validate partial ingredient')
  const result = await ingredientSchema.partial().safeParseAsync(ingredient)

  if (!result.success) {
    throw new Error(result.error.message)
  }

  console.log(result.data)
  result.data.name 
  && result.data.id
  && await validateName(result.data.name, result.data.id)

  return result.data
}

export const validateIngredients = async (ingredients: any[]): Promise<Ingredient[]> => {
  return await Promise.all(ingredients.map(async (ingredient: any) => await validateIngredient(ingredient)))
}

const validateName = async (name: string, id: number): Promise<void> => {
  console.log(id, '--------------------')
  const object = await getIngredientByName(name, id)
  if (object !== undefined) throw new Error('Este nombre ya existe')
}
