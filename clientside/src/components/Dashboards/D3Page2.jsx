import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { apiDomain } from '../../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Paywall from '../Payments/Paywall'

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const D3Page2 = ({isFullMember}) => {
    const [filteredData, setFilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('8Y');

    const fetchData = (period) =>{
        axios.get(`${apiDomain}/macroeconomics/inflation_rates/`, { params: { period } })
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
    }


    // Function to toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
        // Fetch data for the selected period
        fetchData(selectedPeriod);
    };

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
                        return `Inflation Rate: ${tooltipItem.raw.toLocaleString()} %`;
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

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="my-4" style={{width: "80vw"}}>
            {isFullMember ? (
                <>
                    <h2 className="text-center">Monthly Inflation Trend (2024)</h2>
                    <div className="text-center mb-4">
                        <button className="btn btn-primary mx-2" onClick={() => handlePeriodChange('YTD')}>YTD</button>
                        <button className="btn btn-primary mx-2" onClick={() => handlePeriodChange('3M')}>Last 3M</button>
                        <button className="btn btn-primary mx-2" onClick={() => handlePeriodChange('1M')}>Last 1M</button>
                    </div>
                    <Line data={chartData} options={options}/>
                </>
            ) : (
                <div className="text-center">
                    <h2 className="mt-5">This content is only accessible to full members.</h2>
                    <div>
                        <button className="btn btn-primary mt-4" onClick={toggleModal}>Become full member</button>
                    </div>
                </div>
            )}


            {/* Make Payment to become a full member */}
            <Modal show={showModal} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Premium package</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Paywall />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>Close</Button>
                    </Modal.Footer>
            </Modal>
        </div>
    );
};

D3Page2.propTypes = {
    isFullMember: PropTypes.bool.isRequired, // Validates that isFullMember is a required boolean prop
};

export default D3Page2;


