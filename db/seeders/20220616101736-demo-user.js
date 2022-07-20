require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@admin.ru',
      password: await bcrypt.hash('123', Number(process.env.SALTROUNDS)),
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      email: 'gfgf.ru',
      password: '456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
