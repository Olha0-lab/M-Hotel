const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();
router.use(protect, isAdmin);

router.get("/", getAllUsers);
router.put("/:id/role", updateUserRole);
router.delete("/:id", deleteUser);

module.exports = router;
