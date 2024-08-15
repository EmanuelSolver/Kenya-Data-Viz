import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { apiDomain } from '../../utils/utils';

ChartJS.register(CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend);

const FinancialAnalysisPage1 = () => {
    const [sharePriceData, setSharePriceData] = useState([]);

    useEffect(() => {
        axios.get(`${apiDomain}/financial_analysis/daily_share_prices/`)
            .then(response => {
                const data = response.data.share_prices.map(item => ({
                    x: new Date(item['Date']),
                    open: item[' Open'],           
                    high: item[' High'],           
                    low: item[' Low'],            
                    close: item[' Close'], 
                }));
                setSharePriceData(data);
            })
            .catch(error => {
                console.error('Error fetching share price data:', error);
            });
    }, []);

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
        <div className="my-4" style={{ width: "80vw" }}>
            <h2 className="text-center">Safaricom Share Prices (From July)</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default FinancialAnalysisPage1;
