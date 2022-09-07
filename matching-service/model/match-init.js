import { Model, DataTypes } from 'sequelize';

export const matcher = (sequelize) => {
    sequelize.define('matchInit', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}
