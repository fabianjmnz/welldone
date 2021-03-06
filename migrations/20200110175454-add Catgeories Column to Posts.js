'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Posts',
      'categories',
      {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Posts','categories')
  }
};
