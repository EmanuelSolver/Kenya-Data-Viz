import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { apiDomain } from '../../utils/utils';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale // Import TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import date adapter

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale // Register TimeScale
);

const Dashboard2 = () => {
    const [exchangeRatesData, setExchangeRatesData] = useState([]);

    useEffect(() => {
        axios.get(`${apiDomain}/macroeconomics/exchange_rates/`)
            .then(response => {
                if (response.data && response.data.exchange_rates) {
                    console.log(response.data.exchange_rates)
                    setExchangeRatesData(response.data.exchange_rates);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching exchange rate data:', error);
            });
    }, []);

    const chartData = {
        labels: exchangeRatesData.map(item => item.Date), // Dates
        datasets: [
            {
                label: 'USD/KES Exchange Rate',
                data: exchangeRatesData.map(item => item.Mean), // Exchange rate values
                borderColor: 'rgba(54,162,235,1)',
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderWidth: 2,
                fill: true
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Rate: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month',
                    tooltipFormat: 'MMM YYYY'
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Exchange Rate'
                },
                ticks: {
                    callback: function(value) {
                        return `${value}`;
                    }
                }
            }
        }
    };

    return (
        <div className="container-fluid"  style={{width: "80vw"}}>
            <div className="row">
                <div className="col-md-12 mb-4">
                    <h2 className="text-center">USD/KES Exchange Rate(2019 - 2024)</h2>

                    <Line data={chartData} options={chartOptions} />

                </div>
            </div>
        </div>
    );
};

export default Dashboard2;
