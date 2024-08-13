// src/components/datapoints/PopulationChart.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { apiDomain } from '../../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = () => {
    const [populationData, setPopulationData] = useState([]);

    useEffect(() => {
        axios.get(`${apiDomain}/macroeconomics/population/`)
            .then(response => {
                // Process response data
                setPopulationData(response.data);
            })
            .catch(error => {
                console.error('Error fetching population data:', error);
            });
    }, []);

    const chartData = {
        labels: populationData.map(item => item.date), // Year
        datasets: [
            {
                label: 'Population',
                data: populationData.map(item => item.value), // Population value
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
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
                            return `No of people ${tooltipItem.raw.toLocaleString()}`;
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
                        text: 'No of people'
                    },
                    ticks: {
                        callback: function(value) {
                            return `${value.toLocaleString()}`;
                        }
                    }
                }
            }
        };

    return (
        <div>
            <h2>Historical Population of Kenya</h2>
            <Bar data={chartData} options={options}/>
        </div>
    );
};

export default PopulationChart;
