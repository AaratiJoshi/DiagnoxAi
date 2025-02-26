const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { predictBrainTumor } = require('../controllers/brainController');

// Define the route
router.post('/predict', upload.single('file'), predictBrainTumor);

module.exports = router;
