const tf = require('@tensorflow/tfjs-node');

let brainModel = null;

// Load model function
const loadModel = async (modelPath) => {
  if (!brainModel) {
    brainModel = await tf.loadLayersModel(`file://${modelPath}`);
    console.log("Brain model loaded successfully.");
  }
  return brainModel;
};

// Preprocess image
const preprocessImage = (imageBuffer, size) => {
  const imageTensor = tf.node.decodeImage(imageBuffer)
    .resizeBilinear([size, size])
    .expandDims(0)
    .toFloat()
    .div(tf.scalar(255)); // Normalize pixel values
  
  return imageTensor;
};

module.exports = { loadModel, preprocessImage };
