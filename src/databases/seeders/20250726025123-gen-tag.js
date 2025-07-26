"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const tags = [
      {
        tagName: "Vivamus",
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        tagName: "Phasellus",
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        tagName: "pulvinar",
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        tagName: "Curabitur",
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        tagName: "Fusce",
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        tagName: "Sem quis",
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        tagName: "Mollis metus",
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        tagName: "Sit amet",
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        tagName: "Vel posuere",
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        tagName: "orci luctus",
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
    ];
    await queryInterface.bulkInsert("Tags", tags, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Tags", null, {});
  },
};
