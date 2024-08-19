import { useState, useEffect, useContext } from 'react';
import Profile from "../Auth/Profile";
import Dashboard1 from "./Dashboard1";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";
import D3Page1 from "./D3Page1";
import D3Page2 from "./D3Page2";
import FinancialAnalysisPage1 from "./FAPage1";
import FinancialAnalysisPage2 from "./FAPage2";
import FinancialAnalysis from "../../pages/FinancialAnalysis";
import { Context } from '../../context/navigationContext/Context';

const MainDash = () => {
    const { navigator } = useContext(Context);
    const [isFullMember, setIsFullMember] = useState(() => localStorage.getItem('subscription') === 'active');

    useEffect(() => {
        // Check subscription status on component mount
        setIsFullMember(localStorage.getItem('subscription') === 'active');

        // Listen for storage changes across different tabs/windows
        const handleStorageChange = (event) => {
            if (event.storageArea === localStorage) {
                const updatedStatus = localStorage.getItem('subscription');
                setIsFullMember(updatedStatus === 'active');
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Empty dependency array ensures this effect runs only once

    console.log("Is the user a full member: ", isFullMember);

    return (
        <div style={{ height: '100vh', overflow: 'auto' }}>
            {navigator === 'profile' ? (
                <div className='mainnav-wrapper'>
                    <Profile />
                </div>
            ) : navigator === 'dashboard1' ? (
                <div className='mainnav-wrapper'>
                    <Dashboard1 />
                </div>
            ) : navigator === 'dashboard2' ? (
                <div className='mainnav-wrapper'>
                    <Dashboard2 />
                </div>
            ) : navigator === 'dashboard3' ? (
                <div className='mainnav-wrapper'>
                    <Dashboard3 />
                </div>
            ) : navigator === 'd3-page1' ? (
                <div className='mainnav-wrapper'>
                    <D3Page1 />
                </div>
            ) : navigator === 'd3-page2' ? (
                <div className='mainnav-wrapper'>
                    <D3Page2 isFullMember={isFullMember} />
                </div>
            ) : navigator === 'financial-analysis' ? (
                <div className='mainnav-wrapper'>
                    <FinancialAnalysis />
                </div>
            ) : navigator === 'fa-page1' ? (
                <div className='mainnav-wrapper'>
                    <FinancialAnalysisPage1 />
                </div>
            ) : navigator === 'fa-page2' ? (
                <div className='mainnav-wrapper'>
                    <FinancialAnalysisPage2 isFullMember={isFullMember} />
                </div>
            ) : null}
        </div>
    );
};

export default MainDash;
