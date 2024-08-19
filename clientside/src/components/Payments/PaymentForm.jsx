import { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { apiDomain, stripePublicKey } from '../../utils/utils';
import { Button, Form, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { ContextUser } from "../../context/userContext/userContext";

const stripePromise = loadStripe(stripePublicKey);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const { user } = useContext(ContextUser);

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

  const updateSubscriptionStatus = () => {
    localStorage.setItem('subscription', 'active');
    window.dispatchEvent(new Event('subscriptionUpdated'));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !csrfToken) {
      setError('Stripe.js has not loaded or CSRF token is missing.');
      return;
    }

    setLoading(true);
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
    } else {
      try {
        const response = await axios.post(
          `${apiDomain}/payment/process-payment/`,
          { payment_method: paymentMethod.id, user_id: user.user_data.id },
          { headers: { 'X-CSRFToken': csrfToken } }
        );

        if (response.data.error) {
          setError(response.data.error);
        } else {
          setSuccess(true);
          updateSubscriptionStatus();
        }
      } catch (err) {
        setError('Payment failed. Please try again.');
        console.error(err);
      }
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col className="d-flex justify-content-center">
          <div className="card shadow-sm p-4 border-0 w-100" style={{ maxWidth: '600px' }}>
            <h4 className="mb-4 text-center">Payment Information</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="cardElement" className="mb-3">
                <Form.Label className="form-label fw-bold">Credit/Debit Card</Form.Label>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100"
                disabled={!stripe || loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : 'Pay Now'}
              </Button>

              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              {success && <Alert variant="success" className="mt-3">Payment successful!</Alert>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const PaymentForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentForm;
