import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './Home.css'; // Assuming you will create a CSS file for styles

Modal.setAppElement('#root'); // Ensure modal accessibility

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [columnsToDrop, setColumnsToDrop] = useState('');

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleColumnsChange = (event) => {
    setColumnsToDrop(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the file upload and column drop logic here
    console.log('File:', csvFile);
    console.log('Columns to drop:', columnsToDrop);
    // Close the modal after submission
    setModalIsOpen(false);
  };

  return (
    <div className="home">
      <main className="main">
        <h1 className="title">Welcome to the House Price Prediction App</h1>
        <div className="links">
        <button className="link" onClick={() => setModalIsOpen(true)}>Insert Data</button>
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
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={() => setModalIsOpen(false)} 
          contentLabel="Insert Data Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Insert Data</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="csvFile">Upload CSV File:</label>
              <input type="file" id="csvFile" accept=".csv" onChange={handleFileChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="columnsToDrop">Columns to Drop (comma-separated):</label>
              <input 
                type="text" 
                id="columnsToDrop" 
                value={columnsToDrop} 
                onChange={handleColumnsChange} 
                placeholder="e.g., column1,column2" 
              />
            </div>
            <button className='link' type="submit">Submit</button>
            <button className='link' type="button" onClick={() => setModalIsOpen(false)}>Close</button>
          </form>
        </Modal>
      </main>
    </div>
  );
}

export default Home;
