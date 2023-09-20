import { traceFields } from "../../utils/genericTypes/traceFields.type"

export interface BrandAttributes {
  id: number
  name: string
  delete: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: number
  updatedBy: number
}

export interface Brand
  extends Omit<
    BrandAttributes,
    keyof typeof traceFields
  > {}
