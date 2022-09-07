const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('matchInit', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}
