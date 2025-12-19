const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // Guest Info
  guestName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  
  // Verification
  aadhaarNumber: { type: DataTypes.STRING, allowNull: false },
  aadhaarFrontImg: { type: DataTypes.TEXT },
  aadhaarBackImg: { type: DataTypes.TEXT },

  // Stay Info
  checkIn: { type: DataTypes.DATEONLY, allowNull: false },
  checkOut: { type: DataTypes.DATEONLY, allowNull: false },
  nights: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.FLOAT, allowNull: false },
  
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
    validate: { isIn: [["Pending", "Approved", "Cancelled"]] },
  },
  
  // Room Snapshot
  roomName: { type: DataTypes.STRING },
  roomImage: { type: DataTypes.TEXT },
}, { timestamps: true });

module.exports = Booking;