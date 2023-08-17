'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('productModifiers', 'order', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
