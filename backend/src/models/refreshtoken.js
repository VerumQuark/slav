'use strict';
export default (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define( 'RefreshToken', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    }
  }, {} );
  RefreshToken.associate = function (models) {
    RefreshToken.belongsTo( models.User );
  };
  return RefreshToken;
}