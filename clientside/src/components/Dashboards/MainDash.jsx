import Profile from "../Auth/Profile" 
import Dashboard1 from "./Dashboard1"
import Dashboard2 from "./Dashboard2"
import Dashboard3 from "./Dashboard3"
// import D3Page1 from "./D3Page1"
// import D3Page2 from "./D3Page2"
import FinancialAnalysisPage1 from "./FAPage1"
import FinancialAnalysisPage2 from "./FAPage2"

import { Context } from '../../context/navigationContext/Context' 
import { useContext } from 'react'

const MainDash =  () =>{
    const { navigator } = useContext(Context)

  return (
        <div style={{ height: '100vh', overflow: 'auto' }}>
            {
                navigator === 'profile' ? (
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
                        <FinancialAnalysisPage1 />
                    </div>
                ) : navigator === 'd3-page2' ? (
                    <div className='mainnav-wrapper'>
                        <FinancialAnalysisPage2 isFullMember={true}/>
                    </div>
                )  : null
            }    
        </div>
  )
}

export default MainDash



