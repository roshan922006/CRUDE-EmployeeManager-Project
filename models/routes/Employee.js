const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Create
router.post('/', async (req, res) => {
  try {
    const emp = new Employee(req.body);
    const saved = await emp.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All
router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Read One
router.get('/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ error: "Not Found" });
    res.json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted', deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
