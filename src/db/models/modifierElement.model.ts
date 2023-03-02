import { DataTypes, Model, Sequelize } from 'sequelize'
import { ModifierElementAttributes } from '../../services/modifierElement/modifierElement.types'

export class ModifierElementModel extends Model implements ModifierElementAttributes {
  public id!: number
  public name!: string
  public price!: number
  public quantity!: number
  public isProduct!: boolean
  public productReferenceId!: number
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.belongsToMany(models.modifierGroup, {
      through: models.groupElement,
      foreignKey: 'modifierElementId',
      as: 'modifierGroups'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'modifierElements',
      modelName: 'modifierElement',
      timestamps: true
    }
  }
}

export const modifierElementSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  isProduct: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  productReferenceId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  delete: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  createdBy: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  updatedBy: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}
