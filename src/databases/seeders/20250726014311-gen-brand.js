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
    const brands = [
      {
        brandName: "Quintiles",
        brandImage: faker.image.avatar(),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        brandName: "IndiaCapital",
        brandImage: faker.image.avatar(),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        brandName: "PaperlinX",
        brandImage: faker.image.avatar(),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        brandName: "InfraRed",
        brandImage: faker.image.avatar(),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        brandName: "Erlang",
        brandImage: faker.image.avatar(),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
      {
        brandName: "Sport England",
        brandImage: faker.image.avatar(),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      },
    ];
    await queryInterface.bulkInsert("Brands", brands, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Brands", null, {});
  },
};
