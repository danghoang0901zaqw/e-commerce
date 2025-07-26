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
    const products = [];
    for (let i = 0; i < 100; i++) {
      const price = parseFloat(faker.commerce.price());
      const product = {
        productName: faker.commerce.productName(),
        imagePath: faker.image.avatar(),
        price: price,
        oldPrice: parseFloat(
          (price + Math.floor(Math.random() * 100)).toFixed(2)
        ),
        summary: faker.lorem.sentence(),
        description: faker.commerce.productDescription(),
        specification:
          faker.commerce.productAdjective() +
          " " +
          faker.commerce.productMaterial(),
        stars: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        quantity: faker.number.int({ min: 1, max: 1000 }),
        brandId: faker.number.int({ min: 1, max: 6 }),
        categoryId: faker.number.int({ min: 1, max: 4 }),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      };
      products.push(product);
    }
    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
