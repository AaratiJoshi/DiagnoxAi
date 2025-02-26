// const tf = require('@tensorflow/tfjs-node');
// const fs = require('fs');
// const { loadModel, preprocessImage } = require('../services/mlService');

// let brainModel;
// (async () => {
//   try {
//     brainModel = await loadModel('models/brain_model.h5');
//   } catch (error) {
//     console.error('Error loading brain model:', error);
//   }
// })();

// exports.predictBrainTumor = async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const imageBuffer = fs.readFileSync(filePath);
//     const imageTensor = preprocessImage(imageBuffer, 224);

//     const predictions = brainModel.predict(imageTensor);
//     const predictionData = predictions.dataSync();
//     const predictedClass = predictionData.indexOf(Math.max(...predictionData));

//     // Clean up the temporary file
//     fs.unlinkSync(filePath);

//     res.json({ predictedClass, confidence: Math.max(...predictionData) * 100 });
//   } catch (error) {
//     console.error('Error during brain prediction:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
  

const fs = require('fs');
const { loadModel, preprocessImage } = require('../services/mlService');

let brainModel;

// Load the model when the server starts
(async () => {
  try {
    brainModel = await loadModel('models/brain_model.h5');
  } catch (error) {
    console.error('Error loading brain model:', error);
  }
})();

exports.predictBrainTumor = async (req, res) => {
  try {
    if (!brainModel) {
      return res.status(500).json({ error: "Model not loaded yet. Try again later." });
    }

    const filePath = req.file.path;
    const imageBuffer = fs.readFileSync(filePath);
    const imageTensor = preprocessImage(imageBuffer, 224);

    const predictions = brainModel.predict(imageTensor);
    const predictionData = predictions.dataSync();
    const predictedClass = predictionData.indexOf(Math.max(...predictionData));

    // Clean up the temporary file
    fs.unlinkSync(filePath);

    res.json({ predictedClass, confidence: Math.max(...predictionData) * 100 });
  } catch (error) {
    console.error('Error during brain prediction:', error);
    res.status(500).json({ error: error.message });
  }
};
