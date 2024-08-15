import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/navigationContext/Context';
import { useState } from 'react'

const SideNav = () => {
    const { dispatch } = useContext(Context);
    const {isDashboard3Open, setIsDashboard3Open } = useState(false);


    const handleProfile = () => dispatch({ type: 'PROFILE', payload: 'profile' });
    const handleDash1 = () => dispatch({ type: 'DASHBOARD1', payload: 'dashboard1' });
    const handleDash2 = () => dispatch({ type: 'DASHBOARD2', payload: 'dashboard2' });

    const handleDash3 = () => {
        setIsDashboard3Open(!isDashboard3Open);  // Toggle submenu visibility
        dispatch({ type: 'DASHBOARD3', payload: 'dashboard3' });
    };   

    const handlePage1 = () => dispatch({ type: 'D3-PAGE1', payload: 'd3-page1' });
    const handlePage2 = () => dispatch({ type: 'D3-PAGE2', payload: 'd3-page2' });

    return (
        <div style={{ height: '100vh', overflow: 'auto', boxShadow: '3px 2px 2px' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#00004d">
                {/* Sidebar Header */}
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Dashboard
                    </a>
                </CDBSidebarHeader>

                {/* Sidebar Content */}
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        {/* Navigation Links */}
                        <NavLink activeclassname="activeClicked" onClick={handleProfile}>
                            <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink activeclassname="activeClicked" onClick={handleDash1}>
                            <CDBSidebarMenuItem icon="bell">Dashboard1</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink activeclassname="activeClicked" onClick={handleDash2}>
                            <CDBSidebarMenuItem icon="calendar-alt">Dashboard2</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink activeclassname="activeClicked" onClick={handleDash3}>
                            <CDBSidebarMenuItem icon="building">Dashboard3</CDBSidebarMenuItem>
                        </NavLink>



                        {/* Dashboard3 Submenu */}
                        
                        <CDBSidebarMenu collapse={!isDashboard3Open}>
                            <NavLink activeclassname="activeClicked" onClick={handlePage1}>
                                <CDBSidebarMenuItem icon="cogs">D3-Page1</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink activeclassname="activeClicked" onClick={handlePage2}>
                                <CDBSidebarMenuItem icon="cogs">D3-Page2</CDBSidebarMenuItem>
                            </NavLink>
                        </CDBSidebarMenu>
                       

         

                    </CDBSidebarMenu>
                </CDBSidebarContent>

                {/* Sidebar Footer */}
                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div style={{ padding: '20px 5px' }} className="text-decoration-none">
                        <a href="https://personalmygallery.wixsite.com/njiru-emanuel-portfo" style={{ textDecoration: 'none' }}>Developed by Dev~Njiru</a>
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default SideNav;
