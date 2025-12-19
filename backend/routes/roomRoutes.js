const express = require("express");
const { getRooms, getRoomById, createRoom, updateRoom, deleteRoom, addRoomRating } = require("../controllers/roomController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/")
  .get(getRooms)
  .post(protect, admin, createRoom);

router.route("/:id")
  .get(getRoomById)
  .put(protect, admin, updateRoom)
  .delete(protect, admin, deleteRoom);

router.post("/:id/rate", protect, addRoomRating);

module.exports = router;