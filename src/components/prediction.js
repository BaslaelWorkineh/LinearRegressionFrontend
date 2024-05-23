import React, { useState } from 'react';
import axios from 'axios';
import './prediction.css'; // Assuming you will create a CSS file for styles

function App() {
  const [jsonData, setJsonData] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/result', JSON.parse(jsonData), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setPredictedPrice(response.data.predicted_price);
      })
      .catch(error => {
        console.error('There was an error making the prediction!', error);
      });
  };

  return (
    <div className="containerPredicion">
      <h1 className="title">House Price Prediction</h1>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder="Enter JSON data here"
          className="textarea"
        />
        <button type="submit" className="btn">Predict</button>
      </form>
      {predictedPrice && (
        <h2 className="predicted-price">Predicted Price: ${predictedPrice}</h2>
      )}
    </div>
  );
}

export default App;
