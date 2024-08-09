import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';


const MacroeconomicDashboard = () => {
  const [gdpData, setGdpData] = useState([]);
  const [populationData, setPopulationData] = useState([]);
  const [gdpPerCapitaData, setGdpPerCapitaData] = useState([]);

  // Fetch data from backend API
  useEffect(() => {
    axios.get('/api/macroeconomic-data')
      .then(response => {
        setGdpData(response.data.gdp);
        setPopulationData(response.data.population);
        setGdpPerCapitaData(response.data.gdpPerCapita);
      });
  }, []);

  return (
    <div className="container">
      <h2>Macroeconomic Dashboard</h2>
      <Line data={gdpData} options={{ title: { display: true, text: 'GDP Data' } }} />
      <Line data={populationData} options={{ title: { display: true, text: 'Population Data' } }} />
      <Line data={gdpPerCapitaData} options={{ title: { display: true, text: 'GDP per Capita Data' } }} />
    </div>
  );
};

export default MacroeconomicDashboard;
