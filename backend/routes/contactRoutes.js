const express = require("express");
const { submitContact, getAllContacts, deleteContact } = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", submitContact);
router.get("/", protect, admin, getAllContacts);
router.delete("/:id", protect, admin, deleteContact); 

module.exports = router;