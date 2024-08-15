import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { apiDomain } from '../../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const D3Page1 = () => {
    const [juneData, setJuneData] = useState(null);
    const [julyData, setJulyData] = useState(null);


    useEffect(() => {
        axios.get(`${apiDomain}/macroeconomics/inflation_rates/`)
            .then(response => {
                const data = response.data.inflation_data;
               
                // Find data for June and July
                const juneRecord = data.find(record =>
                    new Date(record.Date).getMonth() + 1 === 6 // June
                );

                const julyRecord = data.find(record =>
                    new Date(record.Date).getMonth() + 1 === 7 // July
                );

                setJuneData(juneRecord);
                setJulyData(julyRecord);
            })
            .catch(error => {
                console.error('Error fetching inflation data:', error);
            });
    }, []);

    const chartData = {
        labels: ['June', 'July'],
        datasets: [
            {
                label: 'Inflation Rate (%)',
                data: [
                    juneData ? juneData.Annual_Average_Inflation : 0,
                    julyData ? julyData.Annual_Average_Inflation : 0
                ],
                backgroundColor: 'rgba(54,162,235,0.6)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month of the year'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Inflation Rate (%)'
                }
            }
        }
    };

    return (
        <div className="container-fluid" style={{width: "80vw"}}>
            <h2 className="text-center">Inflation Rate: June vs July (2024)</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default D3Page1;
