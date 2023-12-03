"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "balance", {
      type: Sequelize.DECIMAL(10, 2),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "balance");
  },
};
