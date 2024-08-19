import { useState, useEffect } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';

const MobileMoneyForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState(100); // Autofilled to 100 Ksh
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
          try {
            const response = await axios.get(`${apiDomain}/payment/get-csrf-token/`);
            setCsrfToken(response.data.csrfToken);
          } catch (error) {
            console.error('Failed to fetch CSRF token:', error);
            setError('Failed to fetch CSRF token. Please try again.');
          }
        };
    
        fetchCsrfToken();
      }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                `${apiDomain}/mpesa/process-stk-push/`,
                { phone_number: phoneNumber, amount: amount },
                { headers: { 'X-CSRFToken': csrfToken } }
            );

            if (response.data.error) {
                setError(response.data.error);
            } else {
                setSuccess(true);
                localStorage.setItem('subscription', 'active');
                window.dispatchEvent(new Event('subscriptionUpdated'));
            }
        } catch (err) {
            setError('Payment failed. Please try again.');
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <Form onSubmit={handleSubmit} className="mobile-money-form">
            <h3>Pay via M-Pesa</h3>
            
            <Form.Group controlId="phoneNumber" className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter M-Pesa number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="amount" className="mb-3">
                <Form.Label>Amount (Ksh)</Form.Label>
                <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    readOnly // Make the amount field read-only
                />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Pay Now'}
            </Button>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">Payment successful!</Alert>}
        </Form>
    );
};

export default MobileMoneyForm;
