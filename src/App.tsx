import { useState } from 'react'
import './App.css'

function App() {
  const [isEditVariablesOpen, setIsEditVariablesOpen] = useState(false);
  const [hoveredDataPoint, setHoveredDataPoint] = useState<any>(null);

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="nav-item active">🏠</div>
        <div className="nav-item">⚡</div>
        <div className="nav-item">📊</div>
        <div className="nav-item">🔧</div>
        <div className="nav-item">⚙️</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <div className="breadcrumb">
              <span>Charging Stations</span>
              <span>Fleet Sizing</span>
              <span>Parking</span>
            </div>
          </div>
          <div className="header-right">
            <div className="search-bar">🔍 Search</div>
          </div>
        </div>

        {/* Title Section */}
        <div className="title-section">
          <h1>⚡ Charging Station</h1>
          <div className="title-actions">
            <button className="btn-secondary">🔄 Refresh</button>
            <button 
              className="btn-primary"
              onClick={() => setIsEditVariablesOpen(true)}
            >
              Edit Variables
            </button>
            <button className="btn-secondary">📤</button>
          </div>
        </div>

        {/* Best Scenario Results */}
        <div className="scenario-results">
          <h2>✨ Best Scenario Results</h2>
          <div className="result-card">
            The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.
          </div>
          <div className="result-card">
            The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.
          </div>
        </div>

        <div className="content-grid">
          {/* Charts Section */}
          <div className="charts-section">
            <h3>Graphs</h3>
            <div className="chart-container">
              {/* Simple chart placeholder */}
              <div className="chart">
                <div className="chart-y-axis">
                  <span>$100K</span>
                  <span>$80K</span>
                  <span>$60K</span>
                  <span>$40K</span>
                  <span>$20K</span>
                </div>
                <div className="chart-area">
                  {/* Chart bars/line - we'll make this interactive */}
                  Chart goes here
                </div>
                <div className="chart-x-axis">
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="kpi-section">
            <div className="kpi-header">
              <h3>Key Performance Indicators</h3>
              <button>Variables +</button>
            </div>
            
            <div className="kpi-grid">
              <div className="kpi-card">
                <h4>Infrastructure Units</h4>
                <p className="kpi-value">€421.07</p>
                <p className="kpi-desc">This describes variable two and what the shown data means.</p>
              </div>
              
              <div className="kpi-card">
                <h4>Charging Growth</h4>
                <p className="kpi-value">33.07</p>
                <p className="kpi-desc">This describes variable two and what the shown data means.</p>
              </div>
              
              <div className="kpi-card">
                <h4>Localization change</h4>
                <p className="kpi-value">21.9%</p>
                <p className="kpi-desc">This describes variable two and what the shown data means.</p>
              </div>
              
              <div className="kpi-card">
                <h4>Fleet growth</h4>
                <p className="kpi-value">7.03%</p>
                <p className="kpi-desc">This describes variable two and what the shown data means.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Variables Slide-over */}
      {isEditVariablesOpen && (
        <div className="slide-over-backdrop" onClick={() => setIsEditVariablesOpen(false)}>
          <div className="slide-over-panel" onClick={(e) => e.stopPropagation()}>
            <div className="slide-over-header">
              <h2>Edit Variables</h2>
              <button onClick={() => setIsEditVariablesOpen(false)}>✕</button>
            </div>
            <div className="slide-over-content">
              <p>Variable editing panel content goes here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App