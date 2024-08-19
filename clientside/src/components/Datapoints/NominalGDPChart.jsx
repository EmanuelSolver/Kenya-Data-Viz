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
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRange, setSelectedRange] = useState('full'); 

    useEffect(() => {
        axios.get(`${apiDomain}/macroeconomics/gdp/`)
            .then(response => {
                // Process response data
                const formattedData = response.data.map(item => ({
                    date: item.date,
                    value: item.value
                }));
                setFilteredData(formattedData);
                setGdpData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching GDP data:', error);
            });
    }, []);

    useEffect(() => {
        filterData(selectedRange);
    }, [selectedRange, gdpData]);

    const filterData = (range) => {
        const today = new Date();
        const year = today.getFullYear();
        let filtered;

        switch (range) {
            case '5y':
                filtered = gdpData.filter(item => new Date(item.date).getFullYear() >= (year - 5));
                break;
            case '10y':
                filtered = gdpData.filter(item => new Date(item.date).getFullYear() >= (year - 10));
                break;
            case 'full':
            default:
                filtered = gdpData;
                break;
        }

        setFilteredData(filtered);
    };

    const chartData = {
        labels: filteredData.map(item => item.date), // Using 'date' for labels
        datasets: [
            {
                label: 'Nominal GDP',
                data: filteredData.map(item => item.value), // Using 'value' for data
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
        <div className='container-fluid'>
            <h2>Nominal GDP of Kenya</h2>
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-primary mx-2" onClick={() => setSelectedRange('5y')}>Last 5Y</button>
                <button className="btn btn-primary mx-2" onClick={() => setSelectedRange('10y')}>Last 10Y</button>
                <button className="btn btn-primary mx-2" onClick={() => setSelectedRange('full')}>Full Dataset</button>
            </div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default NominalGDPChart;
