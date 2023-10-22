"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("posts", "title");
    await queryInterface.addColumn("posts", "title", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("posts", "title");
    await queryInterface.addColumn("posts", "title", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });
  },
};
