import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { apiDomain } from '../../utils/utils';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Paywall from '../Payments/Paywall'


ChartJS.register(CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend);

const FinancialAnalysisPage2 = ({ isFullMember }) => {
    const [sharePriceData, setSharePriceData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('3M'); // Default to 3M


    useEffect(() => {
        if (isFullMember) {
            axios.get(`${apiDomain}/financial_analysis/all_share_prices/`, {
                params: { period: selectedPeriod }  // Pass the selected period as a query parameter
            })
            .then(response => {
                const data = response.data.share_prices.map(item => ({
                    x: new Date(item['Date']),
                    open: item[' Open'],
                    high: item[' High'],
                    low: item[' Low'],
                    close: item[' Close'],
                }));
                setSharePriceData(data);
            })
            .catch(error => {
                console.error('Error fetching share price data:', error);
            });
        }
    }, [isFullMember, selectedPeriod]); // Fetch data when isFullMember or selectedPeriod changes


    // Function to toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Function to handle period selection
    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
    };

    const chartData = {
        datasets: [
            {
                label: 'Open Price',
                data: sharePriceData.map(item => ({ x: item.x, y: item.open })),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'High Price',
                data: sharePriceData.map(item => ({ x: item.x, y: item.high })),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'Low Price',
                data: sharePriceData.map(item => ({ x: item.x, y: item.low })),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'Close Price',
                data: sharePriceData.map(item => ({ x: item.x, y: item.close })),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'MMM d, yyyy',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (KES)',
                },
            },
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                display: true,
            },
        },
    };

    return (
        <div className="my-4"  style={{ width: "80vw" }}>
            {isFullMember ? (
                <div>
                    <h2 className="text-center">Safaricom Share Prices</h2>
                    <div className="mb-4 text-center">
                        <button onClick={() => handlePeriodChange('3M')} className="btn btn-primary mx-2">Last 3M</button>
                        <button onClick={() => handlePeriodChange('1M')} className="btn btn-primary mx-2">Last 1M</button>
                        <button onClick={() => handlePeriodChange('5D')} className="btn btn-primary mx-2">Last 5D</button>
                    </div>
                    <Line data={chartData} options={options} />
                </div>
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

FinancialAnalysisPage2.propTypes = {
    isFullMember: PropTypes.bool.isRequired,
};

export default FinancialAnalysisPage2;
