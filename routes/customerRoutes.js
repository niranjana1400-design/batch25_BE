const express = require("express");
const router = express.Router();

const {
  addCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");


router.use(protect);

// ================= ROUTES =================

// CREATE CUSTOMER
router.post("/", addCustomer);

// GET ALL CUSTOMERS (only logged-in user)
router.get("/", getCustomers);

// GET SINGLE CUSTOMER
router.get("/:id", getSingleCustomer);

// UPDATE CUSTOMER
router.put("/:id", updateCustomer);

// DELETE CUSTOMER
router.delete("/:id", deleteCustomer);

module.exports = router;