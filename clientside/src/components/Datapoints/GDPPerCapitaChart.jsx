import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { apiDomain } from '../../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const GDPPerCapitaChart = () => {
    const [gdpPerCapitaData, setGdpPerCapitaData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRange, setSelectedRange] = useState('full'); // default to full dataset

    useEffect(() => {
        axios.get(`${apiDomain}/macroeconomics/gdp-per-capita/`)
            .then(response => {
                setGdpPerCapitaData(response.data);
                setFilteredData(response.data); // initially set to full data
            })
            .catch(error => {
                console.error('Error fetching GDP per Capita data:', error);
            });
    }, []);

    useEffect(() => {
        filterData(selectedRange);
    }, [selectedRange, gdpPerCapitaData]);

    const filterData = (range) => {
        const today = new Date();
        const year = today.getFullYear();
        let filtered;

        switch(range) {
            case '5y':
                filtered = gdpPerCapitaData.filter(item => new Date(item.date).getFullYear() >= (year - 5));
                break;
            case '10y':
                filtered = gdpPerCapitaData.filter(item => new Date(item.date).getFullYear() >= (year - 10));
                break;
            case 'full':
            default:
                filtered = gdpPerCapitaData;
                break;
        }

        setFilteredData(filtered);
    };

    const chartData = {
        labels: filteredData.map(item => item.date),
        datasets: [
            {
                label: 'GDP per Capita',
                data: filteredData.map(item => item.value),
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderWidth: 2,
                fill: true 
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
        <div className='container-fluid'>
            <h2 >GDP per Capita of Kenya</h2>
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-primary mx-2" onClick={() => setSelectedRange('5y')}>Last 5Y</button>
                <button className="btn btn-primary mx-2" onClick={() => setSelectedRange('10y')}>Last 10Y</button>
                <button className="btn btn-primary mx-2" onClick={() => setSelectedRange('full')}>Full Dataset</button>
            </div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default GDPPerCapitaChart;
