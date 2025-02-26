const express = require('express');
const router = express.Router();

// Sample route
router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

module.exports = router;  // ✅ Ensure this is correct
