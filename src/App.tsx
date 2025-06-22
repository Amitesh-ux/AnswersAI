import { useState } from 'react'
import './App.css'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './AuthContext';
import { Login } from './Login';

const mockData = [
  { month: 'Apr', value: 45000, date: '2024-04' },
  { month: 'May', value: 60000, date: '2024-05' },
  { month: 'Jun', value: 70000, date: '2024-06' },
  { month: 'Jul', value: 80000, date: '2024-07' },
  { month: 'Aug', value: 90000, date: '2024-08' },
  { month: 'Sep', value: 100000, date: '2024-09' },
  { month: 'Oct', value: 110000, date: '2024-10' }
]

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { currentUser, logout } = useAuth();
  
  // If not logged in, show login screen
  if (!currentUser) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<div style={{color: 'white', padding: '20px'}}>Analytics Page - Coming Soon</div>} />
      <Route path="/reports" element={<div style={{color: 'white', padding: '20px'}}>Reports Page - Coming Soon</div>} />
      <Route path="/settings" element={<div style={{color: 'white', padding: '20px'}}>Settings Page - Coming Soon</div>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function Dashboard() {
  const { currentUser, logout } = useAuth();
  
  const [editVariablesOpen, setEditVariablesOpen] = useState(false);
  const [hoverData, setHoverData] = useState<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [selectedVariables, setSelectedVariables] = useState<string[]>(['co2-distribution', 'fleet-sizing']);
  const [selectCategory, setSelectCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null);
  const [showContext, setShowContext] = useState<string | null>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const handleVariableHover = (variableId: string) => {
    setHoveredVariable(variableId);

    // Clear any existing timer
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }

    // Set 1.5 second timer
    hoverTimer.current = setTimeout(() => {
      setShowContext(variableId);
    }, 1500);
  };

  const handleVariableLeave = () => {
    setHoveredVariable(null);
    setShowContext(null);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

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
            {/* Add logout button */}
            <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#888', fontSize: '14px' }}>
                {currentUser?.email}
              </span>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#ff4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="title-section">
          <h1>⚡ Charging Station</h1>
          <div className="title-actions">
            <button className="btn-secondary">🔄 Refresh</button>
            <button
              className="btn-primary"
              onClick={() => setEditVariablesOpen(true)}
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
                  {/* Responsive container for the chart, library suggested by Claude */}
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888', fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888', fontSize: 12 }}
                        tickFormatter={(value) => `€${value / 1000}K`}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#9fef00"
                        strokeWidth={2}
                        dot={{ fill: '#9fef00', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: '#9fef00', strokeWidth: 2 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#2a2a2a',
                          border: '1px solid #9fef00',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                        formatter={(value: any) => [`€${value.toLocaleString()}`, 'Revenue']}
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
      {editVariablesOpen && (
        <div className="slide-over-backdrop" onClick={() => setEditVariablesOpen(false)}>
          <div className="slide-over-panel" onClick={(e) => e.stopPropagation()}>
            <div className="slide-over-header">
              <h2>Edit Variables</h2>
              <button onClick={() => setEditVariablesOpen(false)}>✕</button>
            </div>
            <div className="slide-over-content">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search variables..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="variable-tag-example">
                <h4 style={{ color: '#fff', margin: '20px 0 10px 0' }}>Variable Category 1</h4>

                <button
                  onClick={() => {
                    if (selectedVariables.includes('carbon-1')) {
                      setSelectedVariables(selectedVariables.filter(id => id !== 'carbon-1'));
                    }
                    else {
                      setSelectedVariables([...selectedVariables, 'carbon-1']);
                    }
                  }}

                  onMouseEnter={() => handleVariableHover('carbon-1')}
                  onMouseLeave={handleVariableLeave}

                  style={{
                    padding: '8px 12px',
                    backgroundColor: selectedVariables.includes('carbon-1') ? '#9fef00' : '#666',
                    color: selectedVariables.includes('carbon-1') ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    margin: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Carbon 1 {selectedVariables.includes('carbon-1') ? '×' : '+'}
                </button>

                <button
                  onClick={() => {
                    if (selectedVariables.includes('co2-distribution')) {
                      setSelectedVariables(selectedVariables.filter(id => id !== 'co2-distribution'));
                    }
                    else {
                      setSelectedVariables([...selectedVariables, 'co2-distribution']);
                    }
                  }}

                  onMouseEnter={() => handleVariableHover('co2-distribution')}
                  onMouseLeave={handleVariableLeave}

                  style={{
                    padding: '8px 12px',
                    backgroundColor: selectedVariables.includes('co2-distribution') ? '#9fef00' : '#666',
                    color: selectedVariables.includes('co2-distribution') ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    margin: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Co2 Distribution {selectedVariables.includes('co2-distribution') ? '×' : '+'}
                </button>

                <button
                  onClick={() => {
                    if (selectedVariables.includes('fleet-sizing')) {
                      setSelectedVariables(selectedVariables.filter(id => id !== 'fleet-sizing'));
                    }
                    else {
                      setSelectedVariables([...selectedVariables, 'fleet-sizing']);
                    }
                  }}

                  onMouseEnter={() => handleVariableHover('fleet-sizing')}
                  onMouseLeave={handleVariableLeave}

                  style={{
                    padding: '8px 12px',
                    backgroundColor: selectedVariables.includes('fleet-sizing') ? '#9fef00' : '#666',
                    color: selectedVariables.includes('fleet-sizing') ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    margin: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Fleet sizing {selectedVariables.includes('fleet-sizing') ? '×' : '+'}
                </button>
              </div>

              <div className="variable-tag-example">
                <h4 style={{ color: '#fff', margin: '20px 0 10px 0' }}>Variable Category 2</h4>

                <button
                  onClick={() => {
                    if (selectedVariables.includes('energy-consumption')) {
                      setSelectedVariables(selectedVariables.filter(id => id !== 'energy-consumption'));
                    } else {
                      setSelectedVariables([...selectedVariables, 'energy-consumption']);
                    }
                  }}
                  onMouseEnter={() => handleVariableHover('energy-consumption')}
                  onMouseLeave={handleVariableLeave}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: selectedVariables.includes('energy-consumption') ? '#9fef00' : '#666',
                    color: selectedVariables.includes('energy-consumption') ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    margin: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Energy Consumption {selectedVariables.includes('energy-consumption') ? '×' : '+'}
                </button>

                <button
                  onClick={() => {
                    if (selectedVariables.includes('peak-demand')) {
                      setSelectedVariables(selectedVariables.filter(id => id !== 'peak-demand'));
                    } else {
                      setSelectedVariables([...selectedVariables, 'peak-demand']);
                    }
                  }}
                  onMouseEnter={() => handleVariableHover('peak-demand')}
                  onMouseLeave={handleVariableLeave}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: selectedVariables.includes('peak-demand') ? '#9fef00' : '#666',
                    color: selectedVariables.includes('peak-demand') ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    margin: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Peak Demand {selectedVariables.includes('peak-demand') ? '×' : '+'}
                </button>
              </div>

              <div className="variable-tag-example">
                <h4 style={{ color: '#fff', margin: '20px 0 10px 0' }}>Variable Category 3</h4>

                <button
                  onClick={() => {
                    if (selectedVariables.includes('utilization-rate')) {
                      setSelectedVariables(selectedVariables.filter(id => id !== 'utilization-rate'));
                    } else {
                      setSelectedVariables([...selectedVariables, 'utilization-rate']);
                    }
                  }}
                  onMouseEnter={() => handleVariableHover('utilization-rate')}
                  onMouseLeave={handleVariableLeave}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: selectedVariables.includes('utilization-rate') ? '#9fef00' : '#666',
                    color: selectedVariables.includes('utilization-rate') ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    margin: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Utilization Rate {selectedVariables.includes('utilization-rate') ? '×' : '+'}
                </button>
              </div>

              {/* Context Panel */}
              {showContext === 'carbon-1' && (
                <div style={{
                  position: 'absolute',
                  top: '300px',
                  left: '20px',
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  padding: '15px',
                  width: '250px',
                  zIndex: 1000,
                  color: '#fff'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#9fef00' }}>Carbon 1</h4>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                    Carbon tracking variable that monitors CO2 emissions across the charging network.
                    Essential for environmental impact analysis and sustainability reporting.
                  </p>
                </div>
              )}

              {showContext === 'co2-distribution' && (
                <div style={{
                  position: 'absolute',
                  top: '300px',
                  left: '20px',
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  padding: '15px',
                  width: '250px',
                  zIndex: 1000,
                  color: '#fff'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#9fef00' }}>Co2 Distribution</h4>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                    But what truly sets Switch apart is its versatility. It can be used as a scooter, a
                    bike, or even a skateboard, making it suitable for people of all ages.
                  </p>
                </div>
              )}

              {showContext === 'fleet-sizing' && (
                <div style={{
                  position: 'absolute',
                  top: '300px',
                  left: '20px',
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  padding: '15px',
                  width: '250px',
                  zIndex: 1000,
                  color: '#fff'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#9fef00' }}>Fleet Sizing</h4>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                    Optimization variable for determining optimal fleet size based on demand patterns,
                    charging capacity, and operational efficiency metrics.
                  </p>
                </div>
              )}

              {showContext === 'energy-consumption' && (
                <div style={{
                  position: 'absolute',
                  top: '300px',
                  left: '20px',
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  padding: '15px',
                  width: '250px',
                  zIndex: 1000,
                  color: '#fff'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#9fef00' }}>Energy Consumption</h4>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                    Real-time energy consumption tracking across all charging stations for optimization.
                  </p>
                </div>
              )}

              {showContext === 'peak-demand' && (
                <div style={{
                  position: 'absolute',
                  top: '300px',
                  left: '20px',
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  padding: '15px',
                  width: '250px',
                  zIndex: 1000,
                  color: '#fff'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#9fef00' }}>Peak Demand</h4>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                    Peak demand analysis for capacity planning and load balancing optimization.
                  </p>
                </div>
              )}

              {showContext === 'utilization-rate' && (
                <div style={{
                  position: 'absolute',
                  top: '300px',
                  left: '20px',
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  padding: '15px',
                  width: '250px',
                  zIndex: 1000,
                  color: '#fff'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#9fef00' }}>Utilization Rate</h4>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                    Station utilization metrics for efficiency analysis and resource allocation.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App