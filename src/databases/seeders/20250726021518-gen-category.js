"use strict";

const { faker } = require("@faker-js/faker");

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
    const categories = [
      {
        categoryName: "Girls",
        categoryImage: faker.image.avatar(),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        categoryName: "Kids",
        categoryImage: faker.image.avatar(),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        categoryName: "Men",
        categoryImage: faker.image.avatar(),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        categoryName: "Women",
        categoryImage: faker.image.avatar(),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
    ];
    await queryInterface.bulkInsert("Categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
