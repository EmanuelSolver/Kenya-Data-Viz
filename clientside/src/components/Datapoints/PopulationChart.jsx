import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { apiDomain } from '../../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = () => {
    const [populationData, setPopulationData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRange, setSelectedRange] = useState('full'); // default to full dataset

    useEffect(() => {
        axios.get(`${apiDomain}/macroeconomics/population/`)
            .then(response => {
                setPopulationData(response.data);
                setFilteredData(response.data); // initially set to full data
            })
            .catch(error => {
                console.error('Error fetching population data:', error);
            });
    }, []);

    useEffect(() => {
        filterData(selectedRange);
    }, [selectedRange, populationData]);

    const filterData = (range) => {
        const today = new Date();
        const year = today.getFullYear();
        let filtered;

        switch (range) {
            case '5y':
                filtered = populationData.filter(item => new Date(item.date).getFullYear() >= (year - 5));
                break;
            case '10y':
                filtered = populationData.filter(item => new Date(item.date).getFullYear() >= (year - 10));
                break;
            case 'full':
            default:
                filtered = populationData;
                break;
        }

        setFilteredData(filtered);
    };

    const chartData = {
        labels: filteredData.map(item => item.date), // Year
        datasets: [
            {
                label: 'Population',
                data: filteredData.map(item => item.value), // Population value
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
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
                    label: function (tooltipItem) {
                        return `No of people: ${tooltipItem.raw.toLocaleString()}`;
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
                    callback: function (value) {
                        return `${value.toLocaleString()}`;
                    }
                }
            }
        }
    };

    return (
        <div className='container-fluid'>
            <h2>Population of Kenya</h2>
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-primary mx-2" onClick={() => setSelectedRange('5y')}>Last 5Y</button>
                <button className="btn btn-primary mx-2" onClick={() => setSelectedRange('10y')}>Last 10Y</button>
                <button className="btn btn-primary mx-2" onClick={() => setSelectedRange('full')}>Full Dataset</button>
            </div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default PopulationChart;
