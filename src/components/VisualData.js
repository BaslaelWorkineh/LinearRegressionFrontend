// // src/components/VisualizeData.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const VisualizeData = () => {
//   const [pairplotUrl, setPairplotUrl] = useState(null);
//   const [heatmapUrl, setHeatmapUrl] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/visualizeData')
//       .then(response => {
//         setPairplotUrl(response.data.pairplot_url);
//         setHeatmapUrl(response.data.heatmap_url);
//       })
//       .catch(error => {
//         setError('Error fetching data visualization.');
//         console.error(error);
//       });
//   }, []);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>Data Visualization</h2>
//       {pairplotUrl && <img src={`data:image/png;base64,${pairplotUrl}`} alt="Pairplot" />}
//       {heatmapUrl && <img src={`data:image/png;base64,${heatmapUrl}`} alt="Heatmap" />}
//     </div>
//   );
// };

// export default VisualizeData;

// Using the row data that was sent from the backend

import React, { useEffect, useState } from "react";
import { Scatter, Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Visualize.css"; // Assuming you will create a CSS file for styles

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Visualize = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/visualizeData")
      .then((response) => {
        console.log("Data fetched:", response.data); // Log the fetched data
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const preparePairplotData = (key) => {
    if (!data || data.length === 0) {
      console.warn("No data available to prepare pairplot");
      return { datasets: [] };
    }

    if (!data[0].hasOwnProperty("price")) {
      console.error('Data does not contain "price" key');
      return { datasets: [] };
    }

    return {
      datasets: [
        {
          label: key,
          data: data.map((item) => ({ x: item[key], y: item.price })),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          showLine: false,
        },
      ],
    };
  };

  const prepareHeatmapData = () => {
    if (!data || data.length === 0) {
      console.warn("No data available to prepare heatmap");
      return { labels: [], datasets: [] };
    }

    const labels = Object.keys(data[0]);
    const heatmapData = labels.map((key) => data.map((item) => item[key]));

    return {
      labels: labels,
      datasets: labels.map((label, index) => ({
        label: label,
        data: heatmapData[index],
        backgroundColor: `rgba(75, 192, 192, 0.6)`,
        borderColor: `rgba(75, 192, 192, 1)`,
        borderWidth: 1,
        fill: false,
      })),
    };
  };

  if (!data) {
    return (
      <div className="entireBody">
        <div className="loading-screen">
                <div className="spinner"></div>
        </div>
      </div>
    );
  }

  const keys = Object.keys(data[0]).filter((key) => key !== "price"); // Exclude 'price' from keys

  return (
    <div className="entireBody">
      <h2 className="header">Pairplot</h2>
      <div className="visualize-container">
        {keys.map((key) => (
          <div key={key} className="chart-container">
            <h3>{key} vs price</h3>
            <Scatter
              data={preparePairplotData(key)}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: `Scatter Plot for ${key} vs price`,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: {
                      color: "#ffffff", // White X axis labels
                    },
                    title: {
                      display: true,
                      text: key,
                      color: "#ffffff", // White X axis title
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.2)", // White X axis grid lines
                    },
                  },
                  y: {
                    ticks: {
                      color: "#ffffff", // White Y axis labels
                    },
                    title: {
                      display: true,
                      text: "Price",
                      color: "#ffffff", // White Y axis title
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.2)", // White Y axis grid lines
                    },
                  },
                },
              }}
            />
          </div>
        ))}
      </div>

      <h2 className="header">Heatmap</h2>
      <div className="chart-container heatmapChart">
        <Line
          data={prepareHeatmapData()}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "Heatmap",
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  color: "#ffffff", // White X axis labels
                },
                title: {
                  display: true,
                  text: "Features",
                  color: "#ffffff", // White X axis title
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.2)", // White X axis grid lines
                },
              },
              y: {
                ticks: {
                  color: "#ffffff", // White Y axis labels
                },
                title: {
                  display: true,
                  text: "Values",
                  color: "#ffffff", // White Y axis title
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.2)", // White Y axis grid lines
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Visualize;
