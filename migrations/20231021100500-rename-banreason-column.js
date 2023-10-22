"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("users", "banreason", "banReason");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("users", "banReason", "banreason");
  },
};
