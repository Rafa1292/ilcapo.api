'use strict'
const { Sequelize } = require('sequelize')

module.exports = {
  async up({ context: queryInterface }) {
    return queryInterface.addColumn('productModifiers', 'order', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  }
}
