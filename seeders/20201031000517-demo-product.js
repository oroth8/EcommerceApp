'use strict';

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Products' [{
     brand: "Sennheiser",
     name: "HD 800 Over-the-Ear Headphones - Silver/Black",
     category: "Electronics",
     subCategory: "Headphones",
     price: 1399.95,
     image_URLs: "https://images-na.ssl-images-amazon.com/images/I/91sUPZcumaL._SL1500_.jpg",
     createdAt: new Date(),
     updatedAt: new Date()
   }]);
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
