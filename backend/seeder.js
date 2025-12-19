const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { connectDB, sequelize } = require("./config/db");

const { User, Room, Booking } = require("./models");

dotenv.config();


const users = [
  {
    name: "Admin User",
    email: process.env.ADMIN_EMAIL ,
    password: process.env.ADMIN_PASSWORD ,
    isAdmin: true,
  },
  {
    name: "Ritik Sharma",
    email: "ritik@gmail.com",
    password: "123",
    isAdmin: false,
  },
];

const rooms = [
  {
    name: "Deluxe King Room",
    type: "Deluxe",
    price: 5000,
    description: "A spacious room with a king-size bed, city view, and a luxurious marble bathroom.",
    amenities: ["Wi-Fi", "AC", "Breakfast", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800",
    ],
    rating: 4.8,
  },
  {
    name: "Presidential Suite",
    type: "Suite",
    price: 15000,
    description: "The pinnacle of luxury with panoramic city views and a private jacuzzi.",
    amenities: ["Wi-Fi", "Pool", "AC", "Breakfast", "Parking", "Jacuzzi"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800",
    ],
    rating: 5.0,
  },
  {
    name: "Cozy Single Room",
    type: "Single",
    price: 2500,
    description: "Perfect for solo travelers. Compact luxury.",
    amenities: ["Wi-Fi", "AC", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800",
    ],
    rating: 4.5,
  },
  {
    name: "Ocean View Deluxe",
    type: "Deluxe",
    price: 6500,
    description: "Wake up to the sound of waves. Private balcony included.",
    amenities: ["Wi-Fi", "AC", "Breakfast", "Pool"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800", 
    ],
    rating: 4.9,
  },
  {
    name: "Grand Family Room",
    type: "Family",
    price: 8000,
    description: "Two queen beds and plenty of space for the whole family.",
    amenities: ["Wi-Fi", "AC", "Parking", "Kitchenette"],
    images: [
      "https://homesweb.staah.net/imagelibrary/big_1718180095_5593_GrandFam10.jpeg",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800", 
    ],
    rating: 4.7,
  },
];

//  SEED FUNCTION ---

const importData = async () => {
  try {
    await connectDB();
    await sequelize.sync({ force: true }); 
    console.log("🧹 Database cleared...");

    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    await User.bulkCreate(usersWithHashedPasswords);
    console.log("👤 Users Imported!");

    await Room.bulkCreate(rooms);
    console.log("🏨 Rooms Imported!");

    console.log("✅ Data Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await sequelize.drop();
    console.log("💥 Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}