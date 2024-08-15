import FinancialAnalysisPage1 from '../components/Dashboards/FAPage1';
import FinancialAnalysisPage2 from '../components/Dashboards/FAPage2';

const FinancialAnalysis = () => {
  return (
    <div className="container">
      <h2 className="mt-5">Financial Analysis</h2>
      <FinancialAnalysisPage1 />
      <FinancialAnalysisPage2 isFullMember={true} />

    </div>
  );
};

export default FinancialAnalysis;
