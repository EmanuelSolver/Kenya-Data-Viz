import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { apiDomain } from '../../utils/utils';

// Register the required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const NominalGDPChart = () => {
    const [gdpData, setGdpData] = useState([]);

    useEffect(() => {
        axios.get(`${apiDomain}/macroeconomics/gdp/`)
            .then(response => {
                // Process response data
                const formattedData = response.data.map(item => ({
                    date: item.date,
                    value: item.value
                }));
                setGdpData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching GDP data:', error);
            });
    }, []);

    const chartData = {
        labels: gdpData.map(item => item.date), // Using 'date' for labels
        datasets: [
            {
                label: 'Nominal GDP',
                data: gdpData.map(item => item.value), // Using 'value' for data
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                fill: false
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Nominal GDP: $${tooltipItem.raw.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Nominal GDP (USD)'
                },
                ticks: {
                    callback: function(value) {
                        return `$${value.toLocaleString()}`;
                    }
                }
            }
        }
    };

    return (
        <div>
            <h2>Historical Nominal GDP of Kenya</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default NominalGDPChart;
