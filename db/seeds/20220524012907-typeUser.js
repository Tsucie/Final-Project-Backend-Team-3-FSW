"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "typeUsers",
      [
        {
          type: "Super Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
