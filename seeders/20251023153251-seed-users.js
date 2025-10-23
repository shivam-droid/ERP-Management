'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashed = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Company Admin',
        email: 'admin@techcorp.com',
        password: hashed,
        company_id: 1,
        role_id: 1, // CA
        created_by: null,
        is_deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
