import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Chart, ArcElement, Tooltip, Legend, PieController, DoughnutController } from 'chart.js';

Chart.register(PieController, DoughnutController, ArcElement, Tooltip, Legend);



// Fund data and overlap matrix
const FUNDS_DATA = {
  "HDFC_Large_Cap": {
    fund_name: "HDFC Large Cap Fund",
    category: "Large Cap",
    returns_3y: 18.4,
    risk: "Moderate",
    aum: "₹26,406 Cr",
    expense_ratio: 1.05,
    holdings: {"Reliance Industries": 8.5, "HDFC Bank": 9.2, "ICICI Bank": 6.8, "Infosys": 7.1, "TCS": 6.9}
  },
  "SBI_Blue_Chip": {
    fund_name: "SBI Blue Chip Fund", 
    category: "Large Cap",
    returns_3y: 16.7,
    risk: "Moderate",
    aum: "₹31,125 Cr",
    expense_ratio: 0.95,
    holdings: {"Reliance Industries": 7.8, "HDFC Bank": 8.1, "ICICI Bank": 6.2, "Infosys": 6.8, "TCS": 7.2}
  },
  "ICICI_Pru_Large_Mid": {
    fund_name: "ICICI Prudential Large & Mid Cap Fund",
    category: "Large & Mid Cap",
    returns_3y: 21.4,
    risk: "Moderately High",
    aum: "₹18,624 Cr", 
    expense_ratio: 1.12,
    holdings: {"Reliance Industries": 6.5, "HDFC Bank": 7.8, "ICICI Bank": 5.9, "Infosys": 5.2, "Asian Paints": 4.1}
  },
  "Axis_Focused_25": {
    fund_name: "Axis Focused 25 Fund",
    category: "Focused",
    returns_3y: 19.8,
    risk: "High", 
    aum: "₹8,247 Cr",
    expense_ratio: 1.25,
    holdings: {"HDFC Bank": 9.8, "Reliance Industries": 8.2, "ICICI Bank": 7.1, "Bajaj Finance": 6.2, "Asian Paints": 5.8}
  },
  "Mirae_Asset_Emerging_Bluechip": {
    fund_name: "Mirae Asset Emerging Bluechip Fund",
    category: "Large & Mid Cap",
    returns_3y: 20.9,
    risk: "Moderately High",
    aum: "₹45,892 Cr",
    expense_ratio: 0.85,
    holdings: {"Reliance Industries": 5.8, "HDFC Bank": 6.2, "ICICI Bank": 5.1, "Avenue Supermarts": 4.8, "Asian Paints": 4.5}
  },
  "Motilal_Oswal_Midcap": {
    fund_name: "Motilal Oswal Midcap 30 Fund",
    category: "Mid Cap",
    returns_3y: 28.7,
    risk: "High",
    aum: "₹33,608 Cr",
    expense_ratio: 1.15,
    holdings: {"Avenue Supermarts": 7.2, "Pidilite Industries": 6.8, "Titan": 6.5, "Page Industries": 5.9, "Info Edge": 5.2}
  },
  "Parag_Parikh_Flexi_Cap": {
    fund_name: "Parag Parikh Flexi Cap Fund",
    category: "Flexi Cap",
    returns_3y: 23.7,
    risk: "Moderately High",
    aum: "₹110,392 Cr",
    expense_ratio: 0.75,
    holdings: {"HDFC Bank": 8.9, "Infosys": 7.2, "ICICI Bank": 6.8, "Bajaj Finance": 5.9, "Asian Paints": 5.2}
  },
  "UTI_Nifty_50_Index": {
    fund_name: "UTI Nifty 50 Index Fund",
    category: "Large Cap Index",
    returns_3y: 15.2,
    risk: "Moderate",
    aum: "₹8,156 Cr",
    expense_ratio: 0.20,
    holdings: {"Reliance Industries": 8.7, "TCS": 4.1, "HDFC Bank": 8.2, "Infosys": 4.0, "ICICI Bank": 4.8}
  },
  "DSP_Small_Cap": {
    fund_name: "DSP Small Cap Fund",
    category: "Small Cap",
    returns_3y: 25.8,
    risk: "Very High",
    aum: "₹12,447 Cr",
    expense_ratio: 1.35,
    holdings: {"Laurus Labs": 5.8, "Relaxo Footwears": 5.2, "CG Power": 4.9, "Poly Medicure": 4.5, "Fine Organic": 4.2}
  },
  "Nippon_India_Large_Cap": {
    fund_name: "Nippon India Large Cap Fund",
    category: "Large Cap",
    returns_3y: 20.0,
    risk: "Moderate",
    aum: "₹44,164 Cr",
    expense_ratio: 1.00,
    holdings: {"Reliance Industries": 8.9, "HDFC Bank": 7.8, "ICICI Bank": 6.9, "Infosys": 6.2, "TCS": 5.8}
  }
};

const OVERLAP_MATRIX = {
  "HDFC_Large_Cap_SBI_Blue_Chip": 46.0,
  "HDFC_Large_Cap_ICICI_Pru_Large_Mid": 31.8,
  "HDFC_Large_Cap_Axis_Focused_25": 32.1,
  "HDFC_Large_Cap_Mirae_Asset_Emerging_Bluechip": 20.3,
  "HDFC_Large_Cap_Motilal_Oswal_Midcap": 0.0,
  "HDFC_Large_Cap_Parag_Parikh_Flexi_Cap": 26.0,
  "HDFC_Large_Cap_UTI_Nifty_50_Index": 37.7,
  "HDFC_Large_Cap_DSP_Small_Cap": 0.0,
  "HDFC_Large_Cap_Nippon_India_Large_Cap": 38.9,
  "SBI_Blue_Chip_HDFC_Large_Cap": 46.0,
  "SBI_Blue_Chip_ICICI_Pru_Large_Mid": 31.5,
  "SBI_Blue_Chip_Axis_Focused_25": 32.8,
  "SBI_Blue_Chip_Mirae_Asset_Emerging_Bluechip": 20.0,
  "SBI_Blue_Chip_Motilal_Oswal_Midcap": 0.0,
  "SBI_Blue_Chip_Parag_Parikh_Flexi_Cap": 24.0,
  "SBI_Blue_Chip_UTI_Nifty_50_Index": 34.5,
  "SBI_Blue_Chip_DSP_Small_Cap": 0.0,
  "SBI_Blue_Chip_Nippon_India_Large_Cap": 40.9,
  "ICICI_Pru_Large_Mid_HDFC_Large_Cap": 31.8,
  "ICICI_Pru_Large_Mid_SBI_Blue_Chip": 31.5,
  "ICICI_Pru_Large_Mid_Axis_Focused_25": 28.1,
  "ICICI_Pru_Large_Mid_Mirae_Asset_Emerging_Bluechip": 33.1,
  "ICICI_Pru_Large_Mid_Motilal_Oswal_Midcap": 8.1,
  "ICICI_Pru_Large_Mid_Parag_Parikh_Flexi_Cap": 26.8,
  "ICICI_Pru_Large_Mid_UTI_Nifty_50_Index": 26.0,
  "ICICI_Pru_Large_Mid_DSP_Small_Cap": 0.0,
  "ICICI_Pru_Large_Mid_Nippon_India_Large_Cap": 28.6
};

function App() {
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [nudgeMode, setNudgeMode] = useState(true);
  const [modalFund, setModalFund] = useState(null);
  const [showNudgeAlert, setShowNudgeAlert] = useState(false);
  const [nudgeData, setNudgeData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  const categoryChartRef = useRef();
  const riskChartRef = useRef();
  const categoryChartInstance = useRef();
  const riskChartInstance = useRef();

  // Progress calculation
  const progress = Math.min((selectedFunds.length / 3) * 100, 100);

  // Get overlap between two funds
  const getOverlap = (fund1Id, fund2Id) => {
    const key1 = `${fund1Id}_${fund2Id}`;
    const key2 = `${fund2Id}_${fund1Id}`;
    return OVERLAP_MATRIX[key1] || OVERLAP_MATRIX[key2] || 0;
  };

  // Get category class for styling
  const getCategoryClass = (category) => {
    const classMap = {
      'Large Cap': 'large-cap',
      'Mid Cap': 'mid-cap',
      'Small Cap': 'small-cap',
      'Large & Mid Cap': 'large-mid-cap',
      'Flexi Cap': 'flexi-cap',
      'Focused': 'focused',
      'Large Cap Index': 'index'
    };
    return classMap[category] || 'large-cap';
  };

  // Get risk class for styling
  const getRiskClass = (risk) => {
    const classMap = {
      'Moderate': 'risk-moderate',
      'Moderately High': 'risk-high',
      'High': 'risk-high',
      'Very High': 'risk-very-high'
    };
    return classMap[risk] || 'risk-moderate';
  };

  // Handle fund selection
  const selectFund = (fundId) => {
    setModalFund(fundId);
  };

  // Confirm fund selection
  const confirmFundSelection = () => {
    if (!modalFund) return;
    
    const fund = FUNDS_DATA[modalFund];
    const newSelectedFund = { id: modalFund, ...fund };
    
    setSelectedFunds(prev => [...prev, newSelectedFund]);
    setModalFund(null);
    setCurrentStep(prev => Math.min(prev + 1, 4));
    
    // Show nudge if applicable
    if (selectedFunds.length > 0 && nudgeMode) {
      setTimeout(() => {
        showNudgeAnalysis(newSelectedFund);
      }, 300);
    }
  };

  // Show nudge analysis
  const showNudgeAnalysis = (latestFund) => {
    let maxOverlap = 0;
    let overlapFund = null;
    let totalOverlap = 0;
    
    selectedFunds.forEach(prevFund => {
      const overlap = getOverlap(prevFund.id, latestFund.id);
      totalOverlap += overlap;
      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        overlapFund = prevFund;
      }
    });
    
    const avgOverlap = totalOverlap / selectedFunds.length;
    
    if (maxOverlap > 25) {
      setNudgeData({
        type: 'warning',
        maxOverlap,
        overlapFund,
        avgOverlap,
        message: `High overlap detected! Your selected fund has ${maxOverlap}% overlap with ${overlapFund.fund_name}. Consider a more diversified option.`
      });
      setShowNudgeAlert(true);
    } else if (maxOverlap > 0) {
      setNudgeData({
        type: 'success',
        avgOverlap,
        message: `Great diversification! Portfolio overlap is only ${avgOverlap.toFixed(1)}%.`
      });
      setShowNudgeAlert(true);
      setTimeout(() => setShowNudgeAlert(false), 3000);
    }
  };

  // Calculate diversification score
  const calculateDiversificationScore = () => {
    if (selectedFunds.length < 2) return 100;
    
    let totalOverlap = 0;
    let pairs = 0;
    
    for (let i = 0; i < selectedFunds.length - 1; i++) {
      for (let j = i + 1; j < selectedFunds.length; j++) {
        totalOverlap += getOverlap(selectedFunds[i].id, selectedFunds[j].id);
        pairs++;
      }
    }
    
    const avgOverlap = pairs > 0 ? totalOverlap / pairs : 0;
    return Math.max(0, Math.round(100 - (avgOverlap * 1.5)));
  };

  // Calculate weighted return
  const calculateWeightedReturn = () => {
    if (selectedFunds.length === 0) return 0;
    const totalReturn = selectedFunds.reduce((sum, fund) => sum + fund.returns_3y, 0);
    return (totalReturn / selectedFunds.length).toFixed(1);
  };

  // Export portfolio
  const exportPortfolio = () => {
    const portfolioData = {
      funds: selectedFunds,
      diversificationScore: calculateDiversificationScore(),
      expectedReturn: calculateWeightedReturn(),
      nudgeModeUsed: nudgeMode,
      createdAt: new Date().toISOString()
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "portfolio.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Reset portfolio
  const resetPortfolio = () => {
    setSelectedFunds([]);
    setCurrentStep(1);
    setShowNudgeAlert(false);
    setNudgeData(null);
    if (categoryChartInstance.current) {
      categoryChartInstance.current.destroy();
    }
    if (riskChartInstance.current) {
      riskChartInstance.current.destroy();
    }
  };

  // Create charts when portfolio is complete
  useEffect(() => {
    if (selectedFunds.length === 3) {
      // Category chart
      if (categoryChartRef.current) {
        const categories = {};
        selectedFunds.forEach(fund => {
          categories[fund.category] = (categories[fund.category] || 0) + 1;
        });
        
        if (categoryChartInstance.current) {
          categoryChartInstance.current.destroy();
        }
        
        categoryChartInstance.current = new Chart(categoryChartRef.current, {
          type: 'pie',
          data: {
            labels: Object.keys(categories),
            datasets: [{
              data: Object.values(categories),
              backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
              borderWidth: 2,
              borderColor: '#fff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }

      // Risk chart
      if (riskChartRef.current) {
        const risks = {};
        selectedFunds.forEach(fund => {
          risks[fund.risk] = (risks[fund.risk] || 0) + 1;
        });
        
        if (riskChartInstance.current) {
          riskChartInstance.current.destroy();
        }
        
        riskChartInstance.current = new Chart(riskChartRef.current, {
          type: 'doughnut',
          data: {
            labels: Object.keys(risks),
            datasets: [{
              data: Object.values(risks),
              backgroundColor: ['#D2BA4C', '#964325', '#944454', '#13343B'],
              borderWidth: 2,
              borderColor: '#fff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }
    }
  }, [selectedFunds]);

  const isComplete = selectedFunds.length === 3;

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>Smart Mutual Fund Portfolio Builder</h1>
        <p className="subtitle">Build a diversified portfolio with intelligent recommendations</p>
        
        <div className="mode-toggle">
          <label className="toggle-label">
            <input 
              type="checkbox" 
              checked={nudgeMode} 
              onChange={(e) => setNudgeMode(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-text">Nudge Mode (Show Diversification Insights)</span>
          </label>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-steps">
          {[1, 2, 3].map(step => (
            <div 
              key={step}
              className={`step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">Select Fund {step}</div>
            </div>
          ))}
          <div className={`step ${isComplete ? 'completed' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-label">Portfolio Summary</div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Nudge Alert */}
      {showNudgeAlert && nudgeData && (
        <div className={`nudge-alert ${nudgeData.type}`}>
          <div className="nudge-content">
            <div className="nudge-icon">
              {nudgeData.type === 'warning' ? '⚠️' : '✅'}
            </div>
            <div className="nudge-text">
              <h4>{nudgeData.type === 'warning' ? 'High Overlap Detected' : 'Great Diversification!'}</h4>
              <p>{nudgeData.message}</p>
            </div>
          </div>
          {nudgeData.type === 'warning' && (
            <button 
              className="nudge-close"
              onClick={() => setShowNudgeAlert(false)}
            >
              ×
            </button>
          )}
        </div>
      )}

      {/* Main Content */}
      {!isComplete ? (
        <div className="fund-selection active">
          <div className="selection-header">
            <h2>Choose Your {selectedFunds.length === 0 ? 'First' : selectedFunds.length === 1 ? 'Second' : 'Third'} Fund</h2>
            <p>Select a mutual fund to {selectedFunds.length === 0 ? 'start building' : 'diversify'} your portfolio</p>
          </div>

          {/* Selected Funds */}
          {selectedFunds.length > 0 && (
            <div className="selected-funds">
              <h3>Selected Funds ({selectedFunds.length}/3)</h3>
              <div className="selected-funds-grid">
                {selectedFunds.map((fund, index) => (
                  <div key={fund.id} className={`fund-card selected ${getCategoryClass(fund.category)}`}>
                    <div className="fund-header">
                      <h3 className="fund-name">{fund.fund_name}</h3>
                      <span className="fund-category">{fund.category}</span>
                    </div>
                    <div className="fund-metrics">
                      <div className="metric">
                        <div className="metric-value">{fund.returns_3y}%</div>
                        <div className="metric-label">3Y Returns</div>
                      </div>
                      <div className="metric">
                        <div className={`metric-value ${getRiskClass(fund.risk)}`}>{fund.risk}</div>
                        <div className="metric-label">Risk</div>
                      </div>
                    </div>
                    <div className="selection-indicator">
                      ✓ Fund {index + 1} Selected
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Funds */}
          <div className="funds-grid">
            {Object.entries(FUNDS_DATA)
              .filter(([fundId]) => !selectedFunds.some(selected => selected.id === fundId))
              .map(([fundId, fund]) => (
                <div 
                  key={fundId} 
                  className={`fund-card ${getCategoryClass(fund.category)}`}
                  onClick={() => selectFund(fundId)}
                >
                  <div className="fund-header">
                    <h3 className="fund-name">{fund.fund_name}</h3>
                    <span className="fund-category">{fund.category}</span>
                  </div>
                  <div className="fund-metrics">
                    <div className="metric">
                      <div className="metric-value">{fund.returns_3y}%</div>
                      <div className="metric-label">3Y Returns</div>
                    </div>
                    <div className="metric">
                      <div className={`metric-value ${getRiskClass(fund.risk)}`}>{fund.risk}</div>
                      <div className="metric-label">Risk</div>
                    </div>
                  </div>
                  <div className="fund-details">
                    <span>AUM: {fund.aum}</span>
                    <span>Expense: {fund.expense_ratio}%</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        /* Portfolio Summary */
        <div className="portfolio-summary active">
          <div className="summary-header">
            <h2>Portfolio Summary</h2>
            <p>Your diversified mutual fund portfolio is complete!</p>
          </div>

          <div className="summary-metrics">
            <div className="metric-card">
              <div className="metric-value">{calculateDiversificationScore()}/100</div>
              <div className="metric-label">Diversification Score</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{calculateWeightedReturn()}%</div>
              <div className="metric-label">Expected Return</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">3</div>
              <div className="metric-label">Total Funds</div>
            </div>
          </div>

          <div className="final-funds-grid">
            {selectedFunds.map((fund, index) => (
              <div key={fund.id} className={`fund-card ${getCategoryClass(fund.category)}`}>
                <div className="fund-header">
                  <h3 className="fund-name">{fund.fund_name}</h3>
                  <span className="fund-category">{fund.category}</span>
                </div>
                <div className="fund-metrics">
                  <div className="metric">
                    <div className="metric-value">{fund.returns_3y}%</div>
                    <div className="metric-label">3Y Returns</div>
                  </div>
                  <div className="metric">
                    <div className={`metric-value ${getRiskClass(fund.risk)}`}>{fund.risk}</div>
                    <div className="metric-label">Risk</div>
                  </div>
                </div>
                <div className="allocation-info">
                  Fund {index + 1} - 33% Allocation
                </div>
              </div>
            ))}
          </div>

          {/* <div className="charts-container">
            <div className="chart">
              <h4>Category Distribution</h4>
              <canvas ref={categoryChartRef} width="300" height="300"></canvas>
            </div>
            <div className="chart">
              <h4>Risk Distribution</h4>
              <canvas ref={riskChartRef} width="300" height="300"></canvas>
            </div>
          </div> */}

          <div className="action-buttons">
            <button onClick={resetPortfolio} className="btn-secondary">
              Start Over
            </button>
            <button onClick={exportPortfolio} className="btn-primary">
              Export Portfolio
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalFund && (
        <div className="modal-overlay" onClick={() => setModalFund(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{FUNDS_DATA[modalFund].fund_name}</h3>
              <button className="modal-close" onClick={() => setModalFund(null)}>×</button>
            </div>
            
            <div className="modal-body">
              {/* Overlap Analysis */}
              {nudgeMode && selectedFunds.length > 0 && (
                <div className="overlap-analysis">
                  <h4>📊 Diversification Analysis</h4>
                  {selectedFunds.map(selectedFund => {
                    const overlap = getOverlap(modalFund, selectedFund.id);
                    return (
                      <div key={selectedFund.id} className="overlap-item">
                        <span>{selectedFund.fund_name}:</span>
                        <span className={`overlap-value ${overlap > 30 ? 'high' : overlap > 15 ? 'medium' : 'low'}`}>
                          {overlap}% overlap
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="fund-overview">
                <div className="fund-details-grid">
                  <div><strong>Category:</strong> {FUNDS_DATA[modalFund].category}</div>
                  <div><strong>3Y Returns:</strong> {FUNDS_DATA[modalFund].returns_3y}%</div>
                  <div><strong>Risk Level:</strong> {FUNDS_DATA[modalFund].risk}</div>
                  <div><strong>AUM:</strong> {FUNDS_DATA[modalFund].aum}</div>
                  <div><strong>Expense Ratio:</strong> {FUNDS_DATA[modalFund].expense_ratio}%</div>
                </div>
                
                <h4>Top Holdings</h4>
                <table className="holdings-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(FUNDS_DATA[modalFund].holdings).map(([company, allocation]) => (
                      <tr key={company}>
                        <td>{company}</td>
                        <td>{allocation}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="modal-footer">
              <button onClick={() => setModalFund(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={confirmFundSelection} className="btn-primary">
                Add to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
