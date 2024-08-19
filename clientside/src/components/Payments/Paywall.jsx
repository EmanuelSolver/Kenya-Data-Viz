import { useState, useContext, useEffect } from 'react';
import PaymentForm from '../Payments/PaymentForm';
import MobileMoneyForm from '../Payments/MobileMoneyForm'; // Assuming you will create this component
import { ContextUser } from "../../context/userContext/userContext";

const Paywall = () => {
    const [isFullMember, setIsFullMember] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null); // Track the selected payment method
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

    if (!user || !user.access) {
        return <div>Loading...</div>; // or redirect to login
    }

    const handlePaymentMethodSelection = (method) => {
        setPaymentMethod(method);
    };

    return (
        <div>
            {isFullMember ? (
                <div>You are Now a full member!</div>
            ) : (
                <div>
                    {!paymentMethod ? (
                        <div>
                            <h3>Select Payment Method</h3>
                            <button
                                className="btn btn-primary"
                                onClick={() => handlePaymentMethodSelection('card')}
                            >
                                Pay via Debit/Credit Card
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => handlePaymentMethodSelection('mobile')}
                            >
                                Pay via Mobile Money (M-Pesa)
                            </button>
                        </div>
                    ) : paymentMethod === 'card' ? (
                        <PaymentForm />
                    ) : paymentMethod === 'mobile' ? (
                        <MobileMoneyForm />
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default Paywall;
