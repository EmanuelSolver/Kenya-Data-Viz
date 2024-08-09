import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const FinancialDashboard = () => {
  const [sharePriceData, setSharePriceData] = useState([]);

  useEffect(() => {
    axios.get('/api/financial-data')
      .then(response => {
        setSharePriceData(response.data.sharePrices);
      });
  }, []);

  return (
    <div className="container">
      <h2>Financial Dashboard</h2>
      <Line data={sharePriceData} options={{ title: { display: true, text: 'Share Prices Data' } }} />
    </div>
  );
};

export default FinancialDashboard;
