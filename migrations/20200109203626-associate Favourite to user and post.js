'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Favourites',
        'user_id',
        {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Favourite', 'user_id')
  }
};
