const { Room, Rating, Booking } = require("../models");

exports.getRooms = async (req, res) => {
  try {
    
    const rooms = await Room.findAll({ order: [['createdAt', 'DESC']] });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (room) res.json(room);
    else res.status(404).json({ message: "Room not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (room) {
      await room.update(req.body);
      res.json(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (room) {
      await room.destroy();
      res.json({ message: "Room removed" });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  RATING ---
exports.addRoomRating = async (req, res) => {
  const { rating, review, userId } = req.body;
  const roomId = req.params.id;

  try {
    const booking = await Booking.findOne({
      where: { 
        userId, 
        roomId, 
        status: "Approved" 
      }
    });

    if (!booking) {
      return res.status(400).json({ 
        message: "You can only rate rooms that have an approved booking." 
      });
    }

    await Rating.create({ userId, roomId, rating, review });

    const allRatings = await Rating.findAll({ where: { roomId } });
    
    const totalScore = allRatings.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRating = totalScore / allRatings.length;

    await Room.update(
      { 
        rating: avgRating.toFixed(1), 
        ratingCount: allRatings.length 
      },
      { where: { id: roomId } }
    );

    res.status(201).json({ 
      message: "Rating added successfully", 
      newRating: avgRating 
    });

  } catch (error) {
    console.error("Rating Error:", error);
    res.status(500).json({ message: error.message });
  }
};