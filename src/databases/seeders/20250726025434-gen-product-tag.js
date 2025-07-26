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
    let productTags = [];
    for (let i = 0; i < 200; i++) {
      const productTag = {
        productId: faker.number.int({ min: 1, max: 100 }),
        tagId: faker.number.int({ min: 1, max: 10 }),
        createdAt: Sequelize.literal("GETDATE()"),
        updatedAt: Sequelize.literal("GETDATE()"),
      };
      productTags.push(productTag);
    }
    productTags = productTags.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.productId === value.productId && t.tagId === value.tagId
        )
    );
    await queryInterface.bulkInsert("ProductTags", productTags, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("ProductTags", null, {});
  },
};
