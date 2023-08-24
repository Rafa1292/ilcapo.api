'use strict';
const { Sequelize } = require('sequelize')

module.exports = {
  async up ({ context: queryInterface}) {
    await queryInterface.addColumn('products', 'needsCommand', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  }
};
