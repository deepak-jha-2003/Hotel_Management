const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Room = sequelize.define("Room", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  amenities: { type: DataTypes.JSON},
  images: { type: DataTypes.JSON},
  
  rating: { type: DataTypes.FLOAT, defaultValue: 0 }, 
  ratingCount: { type: DataTypes.INTEGER, defaultValue: 0 }, 
  isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },  
});

module.exports = Room;