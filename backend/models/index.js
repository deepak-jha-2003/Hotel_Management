const User = require("./User");
const Room = require("./Room");
const Booking = require("./Booking");
const Contact = require("./Contact");
const Rating = require("./Rating"); 

// 1. User & Booking
User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

// 2. Room & Booking
Room.hasMany(Booking, { foreignKey: "roomId" });
Booking.belongsTo(Room, { foreignKey: "roomId" });

// 3. User & Rating (User leaves a rating)
User.hasMany(Rating, { foreignKey: "userId" });
Rating.belongsTo(User, { foreignKey: "userId" });

// 4. Room & Rating (Room receives a rating)
Room.hasMany(Rating, { foreignKey: "roomId" });
Rating.belongsTo(Room, { foreignKey: "roomId" });

module.exports = { User, Room, Booking, Contact, Rating };