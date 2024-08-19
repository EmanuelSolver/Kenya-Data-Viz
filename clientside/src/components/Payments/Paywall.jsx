import { useState, useEffect, useContext } from 'react';
import PaymentForm from '../Payments/PaymentForm';
import MobileMoneyForm from '../Payments/MobileMoneyForm'; // Ensure this is imported
import { ContextUser } from "../../context/userContext/userContext";
import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';

const Paywall = () => {
    const [isFullMember, setIsFullMember] = useState(false);
    const [hasDiscountCode, setHasDiscountCode] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [discountError, setDiscountError] = useState('');
    const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(null);
    const { user } = useContext(ContextUser);

    useEffect(() => {
        // Check the initial subscription status from localStorage
        const storedStatus = localStorage.getItem('subscription');
        if (storedStatus === 'active') {
            setIsFullMember(true);
        }

        // Listen for any updates to the subscription status
        const handleSubscriptionUpdate = () => {
            const updatedStatus = localStorage.getItem('subscription');
            setIsFullMember(updatedStatus === 'active');
        };

        window.addEventListener('subscriptionUpdated', handleSubscriptionUpdate);

        return () => {
            window.removeEventListener('subscriptionUpdated', handleSubscriptionUpdate);
        };
    }, []);

    const handleDiscountCodeSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiDomain}/payment/verify-coupon/`, {
                user_id: user.user_data.id,
                code: discountCode
            });
            console.log("verification data: ", response.data);

            if (response.data.valid) {
                // Apply the discount and update subscription status
                setDiscountAmount(response.data.discount_amount); // Set the discount amount
                localStorage.setItem('subscription', 'active');
                setIsFullMember(true);
                setIsPaymentMethodSelected(true);
                window.dispatchEvent(new Event('subscriptionUpdated'));
            } else {
                setDiscountError('Invalid or expired coupon code.');
            }
        } catch (error) {
            console.error('Error verifying coupon code:', error);
            setDiscountError('Error verifying coupon code. Please try again.');
        }
    };

    if (!user || !user.access) {
        return <div>Loading...</div>; // or redirect to login
    }

    return (
        <Container className="mt-4">
            {isFullMember ? (
                <Row className="justify-content-center">
                    <Col md={6}>
                        <div className="alert alert-success" role="alert">
                            You are now a full member!
                            {discountAmount !== null && (
                                <p>You received a discount of Ksh.{discountAmount}</p>
                            )}
                        </div>
                    </Col>
                </Row>
            ) : (
                <Row className="justify-content-center">
                    <Col>
                        <div className="mb-4">
                            <h3>Have a discount code?</h3>
                            <Form onSubmit={handleDiscountCodeSubmit} className="mb-4">
                                <Row className="align-items-center">
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                value={discountCode}
                                                onChange={(e) => setDiscountCode(e.target.value)}
                                                placeholder="Enter discount code"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Button type="submit" variant="primary" className="w-100">Apply</Button>
                                    </Col>
                                </Row>
                                {discountError && <Alert variant="danger" className="mt-3">{discountError}</Alert>}
                            </Form>
                        </div>
                        {!isPaymentMethodSelected && (
                            <div className="text-center">
                                <h3>Select Payment Method:</h3>
                                <Button variant="outline-primary" className="mx-2" onClick={() => setHasDiscountCode(false)}>Credit/Debit Card</Button>
                                <Button variant="outline-primary" className="mx-2" onClick={() => setHasDiscountCode(true)}>Mobile Money</Button>
                            </div>
                        )}
                        {hasDiscountCode ? <MobileMoneyForm /> : <PaymentForm />}
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Paywall;
