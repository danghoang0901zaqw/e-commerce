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
    const reviews = [];
    for (let i = 0; i < 1000; i++) {
      const review = {
        content: faker.lorem.paragraph(),
        stars: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        productId: faker.number.int({ min: 1, max: 100 }),
        userId: faker.number.int({ min: 1, max: 100 }),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      };
      reviews.push(review);
    }
    await queryInterface.bulkInsert("Reviews", reviews, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
