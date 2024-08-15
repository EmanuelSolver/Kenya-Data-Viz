import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { apiDomain } from '../../utils/utils';

ChartJS.register(CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend);

const FinancialAnalysisPage2 = ({ isFullMember }) => {
    const [sharePriceData, setSharePriceData] = useState([]);

    useEffect(() => {
        if (isFullMember) {
            axios.get(`${apiDomain}/financial_analysis/all_share_prices/`)
                .then(response => {
                    const data = response.data.share_prices.map(item => ({
                        x: new Date(item['Date']),  // Use bracket notation for keys with quotes
                        open: item[' Open'],           // Adjust spacing if the keys have leading spaces
                        high: item[' High'],           // Adjust spacing if the keys have leading spaces
                        low: item[' Low'],            // Adjust spacing if the keys have leading spaces
                        close: item[' Close'], 
                    }));
                    setSharePriceData(data);
                })
                .catch(error => {
                    console.error('Error fetching share price data:', error);
                });
        }
    }, [isFullMember]);

    const chartData = {
        datasets: [
            {
                label: 'Open Price',
                data: sharePriceData.map(item => ({ x: item.x, y: item.open })),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'High Price',
                data: sharePriceData.map(item => ({ x: item.x, y: item.high })),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'Low Price',
                data: sharePriceData.map(item => ({ x: item.x, y: item.low })),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'Close Price',
                data: sharePriceData.map(item => ({ x: item.x, y: item.close })),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'MMM d, yyyy',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (KES)',
                },
            },
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                display: true,
            },
        },
    };

    return (
        <div className="my-4">
            {isFullMember ? (
                <div style={{ width: "80vw" }}>
                    <h2 className="text-center">Safaricom Share Prices (From June 2024)</h2>
                    <Line data={chartData} options={options} />
                </div>
            ) : (
                <div className="text-center">
                    <h2>This content is only accessible to full members.</h2>
                    <button className="btn btn-primary mt-4">
                        Click here to become a full member
                    </button>
                </div>
            )}
        </div>
    );
};

FinancialAnalysisPage2.propTypes = {
    isFullMember: PropTypes.bool.isRequired,
};

export default FinancialAnalysisPage2;
