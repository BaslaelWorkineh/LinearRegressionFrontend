import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you will create a CSS file for styles

function Home() {
  return (
    <div className="home">
      <main className="main">
        <h1 className="title">Welcome to the House Price Prediction App</h1>
        <div className="links">
          <Link to="/visualize" className="link">Visualize Data</Link>
          <Link to="/predict" className="link">Predict Price</Link>
        </div>
        <div className="documentation">
          <h2 className="documentation-title">Documentation</h2>
          <div className="description">
            <strong>Visualize Data:</strong> 
            <span>Explore the dataset with various visualizations to understand the trends and patterns. This section provides graphical representations of the data, helping you to grasp key insights and make data-driven decisions.</span>
          </div>
          <div className="description">
            <strong>Predict Price:</strong> 
            <span>Enter the details of a house to get an estimated price based on our prediction model. By inputting factors such as location, size, and amenities, you can obtain a precise valuation of the property.</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
