'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { name: 'CA', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Store Manager', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Finance Manager', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
