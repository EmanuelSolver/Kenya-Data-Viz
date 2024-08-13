import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { apiDomain } from '../../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register necessary components of Chart.js, including the Filler plugin
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const GDPPerCapitaChart = () => {
    const [gdpPerCapitaData, setGdpPerCapitaData] = useState([]);

    useEffect(() => {
        axios.get(`${ apiDomain }/macroeconomics/gdp-per-capita/`)
            .then(response => {
                setGdpPerCapitaData(response.data);
            })
            .catch(error => {
                console.error('Error fetching GDP per Capita data:', error);
            });
    }, []);

    // Prepare chart data
    const chartData = {
        labels: gdpPerCapitaData.map(item => item.date), // X-axis labels (years)
        datasets: [
            {
                label: 'GDP per Capita',
                data: gdpPerCapitaData.map(item => item.value), // Y-axis data (GDP per capita values)
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderWidth: 2,
                fill: true // Enable area filling
            }
        ]
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `GDP per Capita: $${tooltipItem.raw.toLocaleString()}`;
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
                    text: 'GDP per Capita (USD)'
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
            <h2>Historical GDP per Capita of Kenya</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default GDPPerCapitaChart;
