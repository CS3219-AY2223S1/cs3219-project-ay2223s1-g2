import { DataTypes } from 'sequelize';

export const initiateMatch = (sequelize) => {
    const model = sequelize.define('matchInit', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return model;
}
