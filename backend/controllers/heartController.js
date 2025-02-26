// const tf = require('@tensorflow/tfjs-node');
const { loadModel } = require('../services/mlService');

let heartModel;
(async () => {
  try {
    heartModel = await loadModel('models/heart_model');
    console.log('Heart model loaded successfully.');
  } catch (error) {
    console.error('Error loading heart model:', error);
  }
})();

exports.predictHeartAttack = async (req, res) => {
  try {
    const { Age, CP, trestbps, Cholesterol, thalachh, oldpeak } = req.body;
    
    // Create a tensor from the input values.
    const inputArray = [
      parseFloat(Age),
      parseFloat(CP),
      parseFloat(trestbps),
      parseFloat(Cholesterol),
      parseFloat(thalachh),
      parseFloat(oldpeak)
    ];
    const inputTensor = tf.tensor2d([inputArray]); // Shape: [1, 6]

    const prediction = heartModel.predict(inputTensor);
    const predictionData = prediction.dataSync();
    
    // Assuming binary classification: if prediction > 0.5 then positive
    const result = predictionData[0] > 0.5 ? 1 : 0;

    res.json({ result, confidence: predictionData[0] });
  } catch (error) {
    console.error('Error during heart prediction:', error);
    res.status(500).json({ error: error.message });
  }
};
