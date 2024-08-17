import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../context/navigationContext/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faTachometerAlt,
    faChartLine,
    faLayerGroup,
    faFileAlt,
    faChartPie,
    faBars,
} from '@fortawesome/free-solid-svg-icons';

const SideNav = () => {
    const { dispatch } = useContext(Context);
    const [isDashboard3Open, setIsDashboard3Open] = useState(false);
    const [isFAOpen, setIsFAOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleProfile = () => dispatch({ type: 'PROFILE', payload: 'profile' });
    const handleDash1 = () => dispatch({ type: 'DASHBOARD1', payload: 'dashboard1' });
    const handleDash2 = () => dispatch({ type: 'DASHBOARD2', payload: 'dashboard2' });
    const handleDash3 = () => {
        setIsDashboard3Open(!isDashboard3Open);
        dispatch({ type: 'DASHBOARD3', payload: 'dashboard3' });
    };
    const handleFinancialAnalysis = () => {
        setIsFAOpen(!isFAOpen);
        dispatch({ type: 'FINANCIALANALYSIS', payload: 'financial-analysis' });
    };
    const handlePage1 = () => dispatch({ type: 'D3-PAGE1', payload: 'd3-page1' });
    const handlePage2 = () => dispatch({ type: 'D3-PAGE2', payload: 'd3-page2' });
    const handleFAPage1 = () => dispatch({ type: 'FA-PAGE1', payload: 'fa-page1' });
    const handleFAPage2 = () => dispatch({ type: 'FA-PAGE2', payload: 'fa-page2' });

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <div className={`d-flex flex-column vh-100 bg-dark text-white shadow ${isCollapsed ? 'collapsed' : ''}`}>
            {/* Sidebar Toggle Button */}
            <div className="p-3 bg-primary text-center">
                <button className="btn btn-primary" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                {!isCollapsed && (
                    <span className="ms-2 text-white">Dashboard</span>
                )}
            </div>

            {/* Sidebar Content */}
            <div className="flex-grow-1">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" onClick={handleProfile}>
                            <FontAwesomeIcon icon={faUser} />
                            {!isCollapsed && <span className="ms-2">Profile</span>}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" onClick={handleDash1}>
                            <FontAwesomeIcon icon={faTachometerAlt} />
                            {!isCollapsed && <span className="ms-2">Dashboard1</span>}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" onClick={handleDash2}>
                            <FontAwesomeIcon icon={faChartLine} />
                            {!isCollapsed && <span className="ms-2">Dashboard2</span>}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" onClick={handleDash3}>
                            <FontAwesomeIcon icon={faLayerGroup} />
                            {!isCollapsed && <span className="ms-2">Dashboard3</span>}
                        </NavLink>
                    </li>

                    {/* Dashboard3 Submenu */}
                    {isDashboard3Open && !isCollapsed && (
                        <ul className="nav flex-column ms-3">
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" onClick={handlePage1}>
                                    <FontAwesomeIcon icon={faFileAlt} />
                                    <span className="ms-2">D3-Page1</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" onClick={handlePage2}>
                                    <FontAwesomeIcon icon={faFileAlt} />
                                    <span className="ms-2">D3-Page2</span>
                                </NavLink>
                            </li>
                        </ul>
                    )}

                    <li className="nav-item">
                        <NavLink className="nav-link text-white" onClick={handleFinancialAnalysis}>
                            <FontAwesomeIcon icon={faChartPie} />
                            {!isCollapsed && <span className="ms-2">Financial Analysis</span>}
                        </NavLink>
                    </li>

                    {/* Financial Analysis Submenu */}
                    {isFAOpen && !isCollapsed && (
                        <ul className="nav flex-column ms-3">
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" onClick={handleFAPage1}>
                                    <FontAwesomeIcon icon={faFileAlt} />
                                    <span className="ms-2">FA-Page1</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" onClick={handleFAPage2}>
                                    <FontAwesomeIcon icon={faFileAlt} />
                                    <span className="ms-2">FA-Page2</span>
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </ul>
            </div>

            {/* Sidebar Footer */}
            <div className="p-3 text-center">
                {!isCollapsed && (
                    <a href="https://personalmygallery.wixsite.com/njiru-emanuel-portfo" className="text-white text-decoration-none">
                        Developed by Dev~Njiru
                    </a>
                )}
            </div>
        </div>
    );
};

export default SideNav;
