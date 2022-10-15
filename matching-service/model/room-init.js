import { DataTypes } from 'sequelize';

export const initiateRoom = (sequelize) => {
    const model = sequelize.define('roomInit', {
        sessionId1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sessionId2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roomId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });
    return model;
}
