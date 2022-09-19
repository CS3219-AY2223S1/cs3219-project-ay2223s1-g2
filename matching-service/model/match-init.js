import { DataTypes } from 'sequelize';

export const initiateMatch = (sequelize) => {
    const model = sequelize.define('matchInit', {
        sessionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return model;
}
