// exports.predictDiabetes = async (req, res) => {
//     try {
//       // Extract diabetes-related inputs from the request body
//       const { Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age } = req.body;
      
//       // TODO: Preprocess inputs (e.g., scaling) and integrate your diabetes model logic here.
      
//       // Placeholder response:
//       res.json({ result: "Diabetes prediction result goes here." });
//     } catch (error) {
//       console.error('Error during diabetes prediction:', error);
//       res.status(500).json({ error: error.message });
//     }
//   };
const tf = require('@tensorflow/tfjs-node');
const { loadModel } = require('../services/mlService');

let diabetesModel;
(async () => {
  try {
    diabetesModel = await loadModel('models/diabetes.h5');
    console.log('Diabetes model loaded successfully.');
  } catch (error) {
    console.error('Error loading diabetes model:', error);
  }
})();

exports.predictDiabetes = async (req, res) => {
  try {
    const { Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age } = req.body;
    
    const inputArray = [
      parseFloat(Pregnancies),
      parseFloat(Glucose),
      parseFloat(BloodPressure),
      parseFloat(SkinThickness),
      parseFloat(Insulin),
      parseFloat(BMI),
      parseFloat(DiabetesPedigreeFunction),
      parseFloat(Age)
    ];
    const inputTensor = tf.tensor2d([inputArray]); // Shape: [1, 8]

    const prediction = diabetesModel.predict(inputTensor);
    const predictionData = prediction.dataSync();
    
    // Assuming binary classification: if value > 0.5 then positive
    const result = predictionData[0] > 0.5 ? 1 : 0;

    res.json({ result, confidence: predictionData[0] * 100 });
  } catch (error) {
    console.error('Error during diabetes prediction:', error);
    res.status(500).json({ error: error.message });
  }
};
