import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { apiDomain } from '../../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const D3Page2 = ({isFullMember}) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get(`${apiDomain}/macroeconomics/inflation_rates/`)
            .then(response => {
                const data = response.data.inflation_data;

                // Filter data for the year 2024 onwards
                const filtered = data.filter(record => {
                    const recordDate = new Date(record.Date);
                    return recordDate.getFullYear() >= 2024;
                });

                setFilteredData(filtered);
            })
            .catch(error => {
                console.error('Error fetching inflation data:', error);
            });
    }, []);

    const chartData = {
        labels: filteredData.map(record => {
            const date = new Date(record.Date);
            return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        }),
        datasets: [
            {
                label: 'Monthly Inflation',
                data: filteredData.map(record => record.Annual_Average_Inflation),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
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
                        return `Nominal GDP: $${tooltipItem.raw.toLocaleString()}`;
                    }
                }
            }
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
        <div className="my-4" style={{width: "80vw"}}>
            {isFullMember ? (
                <>
                    <h2 className="text-center">Monthly Inflation Trend (2024)</h2>
                    <Line data={chartData} options={options}/>
                </>
            ) : (
                <div className="text-center">
                    <p className="alert alert-warning">
                        This content is only accessible to full members.
                    </p>
                    <button className="btn btn-primary" onClick={() => alert('Redirecting to membership page...')}>
                        Click here to become a full member
                    </button>
                </div>
            )}
        </div>
    );
};

export default D3Page2;



D3Page2.propTypes = {
    isFullMember: PropTypes.bool.isRequired, // Validates that isFullMember is a required boolean prop
};

