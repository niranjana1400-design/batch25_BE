const Customer = require("../models/customerModels");
const asyncHandler = require("express-async-handler");

// ================= CREATE CUSTOMER =================
const addCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields required");
  }

  const customer = await Customer.create({
    name,
    email,
    phone,
    user: req.user.id, 
  });

  res.status(201).json(customer);
});

// ================= GET ALL CUSTOMERS (USER BASED) =================
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({ user: req.user.id });

  res.status(200).json(customers);
});

// ================= GET SINGLE CUSTOMER =================
const getSingleCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  //  check ownership
  if (customer.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  res.status(200).json(customer);
});

// ================= UPDATE CUSTOMER =================
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  
 
  const updated = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updated);
});

// ================= DELETE CUSTOMER =================
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  
  if (customer.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  await customer.deleteOne();

  res.status(200).json({ message: "Customer deleted" });
});

// ================= EXPORT =================
module.exports = {
  addCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};