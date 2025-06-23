import { useState } from 'react'
import './App.css'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Zap, BarChart3, Settings, Wrench, Search, RefreshCw, Upload, X, Plus, ChevronDown, Info } from 'lucide-react';

import { AuthProvider, useAuth } from './AuthContext';
import { Login } from './Login';

import { NewHoverDetails } from './NewHoverDetails';

// Mock data for the line chart visualization
// Represents monthly values for the charging station metrics
const mockData = [
  { month: 'Apr', value: 30000 },
  { month: 'May', value: 45000 },
  { month: 'Jun', value: 40000 },
  { month: 'Jul', value: 80000 },
  { month: 'Aug', value: 60000 },
  { month: 'Sep', value: 45000 },
  { month: 'Oct', value: 55000 }
]

/**
 * Main App component that provides authentication and routing
 * Uses Firebase authentication and React Router for navigation
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

/**
 * AppContent component handles routing logic and authentication state
 * Redirects unauthenticated users to login, authenticated users to dashboard
 */
function AppContent() {
  const { currentUser } = useAuth();

  // If no user is authenticated, show login screen
  if (!currentUser) {
    return <Login />;
  }

  // Define application routes for authenticated users
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<div style={{ color: 'white', padding: '20px' }}>Analytics Page - Coming Soon</div>} />
      <Route path="/reports" element={<div style={{ color: 'white', padding: '20px' }}>Reports Page - Coming Soon</div>} />
      <Route path="/settings" element={<div style={{ color: 'white', padding: '20px' }}>Settings Page - Coming Soon</div>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

/**
 * Main Dashboard component implementing the data visualization platform
 * Features: interactive charts, variable selection, slide-over panels, KPI cards
 */
function Dashboard() {
  const { currentUser, logout } = useAuth();

  // State management for UI interactions
  const [editVariablesOpen, setEditVariablesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('Carbon');
  const [selectedVariables, setSelectedVariables] = useState<string[]>(['co2-distribution', 'fleet-sizing']);
  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null);
  const [showContext, setShowContext] = useState<string | null>(null);

  // Timer ref for implementing hover delay on variable context panels
  // Note: Claude AI assisted with this hover delay implementation pattern
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  /**
   * Handles variable hover interaction with 500ms delay
   * Shows context panel after user hovers for sufficient time
   * This prevents context panel flickering during quick mouse movements
   */
  const handleVariableHover = (variableId: string) => {
    setHoveredVariable(variableId);
    // Clear existing timer to reset delay
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
    // Set new timer for 500ms delay before showing context
    hoverTimer.current = setTimeout(() => {
      setShowContext(variableId);
    }, 500);
  };

  /**
   * Handles mouse leave events for variables
   * Immediately hides context panel and clears hover timer
   */
  const handleVariableLeave = () => {
    setHoveredVariable(null);
    setShowContext(null);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  /**
   * Handles user logout with error handling
   * Uses Firebase auth logout method
   */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  /**
   * Toggles variable selection state
   * Manages which variables are active/inactive for the visualization
   */
  const toggleVariable = (variableId: string) => {
    if (selectedVariables.includes(variableId)) {
      // Remove variable if already selected
      setSelectedVariables(selectedVariables.filter(id => id !== variableId));
    } else {
      // Add variable if not selected
      setSelectedVariables([...selectedVariables, variableId]);
    }
  };

  return (
    <div className="app">
      {/* Left Sidebar Navigation */}
      <div className="sidebar">
        <div className="nav-item">
          <Home size={18} />
        </div>
        <div className="nav-item active">
          <Zap size={18} />
        </div>
        <div className="nav-item">
          <BarChart3 size={18} />
        </div>
        <div className="nav-item">
          <Wrench size={18} />
        </div>
        <div className="nav-item">
          <Settings size={18} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Header with breadcrumb and user info */}
        <div className="header">
          <div className="breadcrumb">
            <span>Charging Stations</span>
            <span>Fleet Sizing</span>
            <span>Parking</span>
          </div>
          <div className="search-container">
            {/* Search input with icon */}
            <div style={{ position: 'relative' }}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
            </div>
            {/* User info and logout button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#888' }}>{currentUser?.email}</span>
              <button
                onClick={handleLogout}
                style={{ fontSize: '12px', backgroundColor: '#dc2626', padding: '4px 8px', borderRadius: '4px', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="content">
          {/* Page Title and Action Buttons */}
          <div className="title-section">
            <div className="title">
              <Zap className="text-accent" size={24} />
              <h1>Charging Station</h1>
            </div>
            <div className="title-actions">
              {/* Refresh button */}
              <button className="btn-secondary">
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
              {/* Edit Variables button - opens slide-over panel */}
              <button
                onClick={() => setEditVariablesOpen(true)}
                className="btn-primary"
              >
                Edit Variables
              </button>
              {/* Upload button */}
              <button className="btn-secondary" style={{ padding: '8px' }}>
                <Upload size={16} />
              </button>
            </div>
          </div>

          {/* Best Scenario Results Section */}
          <div className="scenario-results">
            <div className="scenario-header">
              <div className="scenario-title">
                <div className="green-dot"></div>
                <h2 className="text-accent">Best Scenario Results</h2>
              </div>
              <ChevronDown size={20} className="text-muted" style={{ cursor: 'pointer' }} />
            </div>

            {/* Result cards with green styling and ellipsis dots */}
            <div className="result-card">
              The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.
            </div>

            <div className="result-card">
              The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.
            </div>
          </div>

          {/* Main Content Grid - Charts and KPIs */}
          <div className="content-grid">
            {/* Charts Section (Left Column) */}
            <div className="charts-section">
              <h3 className="section-title">Graphs</h3>
              <div className="chart-container">
                <div className="chart-header">
                  <select className="select">
                    <option>Unsatisfied Demand %</option>
                  </select>
                </div>

                {/* Interactive Line Chart with Custom Tooltips */}
                {/* Note: Claude AI assisted with chart configuration and tooltip integration */}
                <div style={{ height: '320px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      {/* X-axis configuration */}
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888', fontSize: 12 }}
                      />
                      {/* Y-axis with Euro formatting */}
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888', fontSize: 12 }}
                        tickFormatter={(value) => `€${value / 1000}K`}
                        domain={[20000, 100000]}
                      />
                      {/* Main line with green accent color */}
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#9fef00"
                        strokeWidth={2}
                        dot={{ fill: '#9fef00', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#9fef00', strokeWidth: 2, fill: '#9fef00' }}
                      />
                      {/* Custom tooltip component */}
                      <Tooltip content={<NewHoverDetails />} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* KPI Section (Right Column) */}
            <div className="kpi-section">
              <div className="kpi-header">
                <h3 className="section-title">Key Performance Indicators</h3>
                <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span>Variables</span>
                  <Plus size={16} />
                </button>
              </div>

              {/* Grid of KPI Cards */}
              <div className="kpi-grid">
                {/* Infrastructure Units KPI */}
                <div className="kpi-card">
                  <div className="kpi-card-header">
                    <h4 className="kpi-card-title">Infrastructure Units</h4>
                    <Info size={14} className="text-muted" />
                  </div>
                  <div className="kpi-value">€421.07</div>
                  <p className="kpi-desc">This describes variable two and what the shown data means.</p>
                </div>

                {/* Charging Growth KPI */}
                <div className="kpi-card">
                  <div className="kpi-card-header">
                    <h4 className="kpi-card-title">Charging Growth</h4>
                    <Info size={14} className="text-muted" />
                  </div>
                  <div className="kpi-value">33.07</div>
                  <p className="kpi-desc">This describes variable two and what the shown data means.</p>
                </div>

                {/* Localization Change KPI */}
                <div className="kpi-card">
                  <div className="kpi-card-header">
                    <h4 className="kpi-card-title">Localization change</h4>
                    <Info size={14} className="text-muted" />
                  </div>
                  <div className="kpi-value">21.9%</div>
                  <p className="kpi-desc">This describes variable two and what the shown data means.</p>
                </div>

                {/* Fleet Growth KPI */}
                <div className="kpi-card">
                  <div className="kpi-card-header">
                    <h4 className="kpi-card-title">Fleet growth</h4>
                    <Info size={14} className="text-muted" />
                  </div>
                  <div className="kpi-value">7.03%</div>
                  <p className="kpi-desc">This describes variable two and what the shown data means.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Variables Slide-over Panel */}
      {/* Note: Claude AI assisted with slide-over animation and backdrop implementation */}
      {editVariablesOpen && (
        <div className="slide-over-backdrop" onClick={() => setEditVariablesOpen(false)}>
          <div className="slide-over-panel" onClick={(e) => e.stopPropagation()}>
            {/* Slide-over Header */}
            <div className="slide-over-header">
              <h2>Edit Variables</h2>
              <button onClick={() => setEditVariablesOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Slide-over Content */}
            <div className="slide-over-content">
              {/* Search and Action Buttons */}
              <div className="search-actions">
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                  <input
                    type="text"
                    placeholder="Search variables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <button className="btn-secondary" style={{ padding: '8px 12px' }}>
                  AutoFill
                </button>
                <button className="btn-primary" style={{ padding: '8px 12px' }}>
                  Rerun
                </button>
              </div>

              {/* Variable Categories with Interactive Tags */}
              {/* Variable Category 1 */}
              <div className="variable-category">
                <h4 className="category-title">Variable category 1</h4>
                <div className="variable-tags">
                  {/* Carbon 1 Variable */}
                  <button
                    onClick={() => toggleVariable('carbon-1')}
                    onMouseEnter={() => handleVariableHover('carbon-1')}
                    onMouseLeave={handleVariableLeave}
                    className={`variable-tag ${selectedVariables.includes('carbon-1') ? 'active' : ''}`}
                  >
                    <span>Carbon 1</span>
                    <span>{selectedVariables.includes('carbon-1') ? '×' : '+'}</span>
                  </button>

                  {/* CO2 Distribution Variable */}
                  <button
                    onClick={() => toggleVariable('co2-distribution')}
                    onMouseEnter={() => handleVariableHover('co2-distribution')}
                    onMouseLeave={handleVariableLeave}
                    className={`variable-tag ${selectedVariables.includes('co2-distribution') ? 'active' : ''}`}
                  >
                    <span>Co2 Distribution</span>
                    <span>{selectedVariables.includes('co2-distribution') ? '×' : '+'}</span>
                  </button>

                  {/* Fleet Sizing Variable */}
                  <button
                    onClick={() => toggleVariable('fleet-sizing')}
                    onMouseEnter={() => handleVariableHover('fleet-sizing')}
                    onMouseLeave={handleVariableLeave}
                    className={`variable-tag ${selectedVariables.includes('fleet-sizing') ? 'active' : ''}`}
                  >
                    <span>Fleet sizing</span>
                    <span>{selectedVariables.includes('fleet-sizing') ? '×' : '+'}</span>
                  </button>
                </div>
              </div>

              {/* Variable Category 2 */}
              <div className="variable-category">
                <h4 className="category-title">Variable Category 2</h4>
                <div className="variable-tags">
                  {/* Parking Rate Variable */}
                  <button
                    onClick={() => toggleVariable('parking-rate')}
                    onMouseEnter={() => handleVariableHover('parking-rate')}
                    onMouseLeave={handleVariableLeave}
                    className={`variable-tag ${selectedVariables.includes('parking-rate') ? 'active' : ''}`}
                  >
                    <span>Parking Rate</span>
                    <span>{selectedVariables.includes('parking-rate') ? '×' : '+'}</span>
                  </button>

                  {/* Border Rate Variable */}
                  <button
                    onClick={() => toggleVariable('border-rate')}
                    onMouseEnter={() => handleVariableHover('border-rate')}
                    onMouseLeave={handleVariableLeave}
                    className={`variable-tag ${selectedVariables.includes('border-rate') ? 'active' : ''}`}
                  >
                    <span>Border Rate</span>
                    <span>{selectedVariables.includes('border-rate') ? '×' : '+'}</span>
                  </button>

                  {/* Request Rate Variable */}
                  <button
                    onClick={() => toggleVariable('request-rate')}
                    onMouseEnter={() => handleVariableHover('request-rate')}
                    onMouseLeave={handleVariableLeave}
                    className={`variable-tag ${selectedVariables.includes('request-rate') ? 'active' : ''}`}
                  >
                    <span>Request rate</span>
                    <span>{selectedVariables.includes('request-rate') ? '×' : '+'}</span>
                  </button>
                </div>
              </div>

              {/* Variable Category 3 */}
              <div className="variable-category">
                <h4 className="category-title">Variable Category 3</h4>
                <div className="variable-tags">
                  {/* Generic Variable Buttons */}
                  <button
                    onClick={() => toggleVariable('variable-3a')}
                    onMouseEnter={() => handleVariableHover('variable-3a')}
                    onMouseLeave={handleVariableLeave}
                    className={`variable-tag ${selectedVariables.includes('variable-3a') ? 'active' : ''}`}
                  >
                    <span>Variable 1</span>
                    <span>{selectedVariables.includes('variable-3a') ? '×' : '+'}</span>
                  </button>

                  <button
                    onClick={() => toggleVariable('variable-3b')}
                    onMouseEnter={() => handleVariableHover('variable-3b')}
                    onMouseLeave={handleVariableLeave}
                    className={`variable-tag ${selectedVariables.includes('variable-3b') ? 'active' : ''}`}
                  >
                    <span>Variable 1</span>
                    <span>{selectedVariables.includes('variable-3b') ? '×' : '+'}</span>
                  </button>

                  <button
                    onClick={() => toggleVariable('variable-3c')}
                    onMouseEnter={() => handleVariableHover('variable-3c')}
                    onMouseLeave={handleVariableLeave}
                    className={`variable-tag ${selectedVariables.includes('variable-3c') ? 'active' : ''}`}
                  >
                    <span>Variable 1</span>
                    <span>{selectedVariables.includes('variable-3c') ? '×' : '+'}</span>
                  </button>
                </div>
              </div>

              {/* Variable Context Panel - Shows detailed information on hover */}
              {/* Note: Claude AI assisted with conditional content display logic */}
              {showContext && (
                <div className="context-panel">
                  <div className="context-title">
                    <h4>{showContext === 'co2-distribution' ? 'Co2 Distribution' :
                      showContext === 'carbon-1' ? 'Carbon 1' :
                        showContext === 'fleet-sizing' ? 'Fleet Sizing' :
                          showContext === 'parking-rate' ? 'Parking Rate' :
                            showContext === 'border-rate' ? 'Border Rate' :
                              showContext === 'request-rate' ? 'Request Rate' :
                                'Variable Details'}</h4>
                    <Info size={14} className="text-muted" />
                  </div>
                  <p className="context-text">
                    {/* Dynamic context text based on selected variable */}
                    {showContext === 'co2-distribution' ?
                      'But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people of all ages. Whether you\'re a student, a professional, or a senior citizen, Switch adapts to your needs and lifestyle.' :
                      showContext === 'carbon-1' ?
                        'Carbon tracking variable that monitors CO2 emissions across the charging network. Essential for environmental impact analysis and sustainability reporting.' :
                        showContext === 'fleet-sizing' ?
                          'Optimization variable for determining optimal fleet size based on demand patterns, charging capacity, and operational efficiency metrics.' :
                          showContext === 'parking-rate' ?
                            'Parking utilization metrics for understanding demand patterns and optimizing station placement.' :
                            showContext === 'border-rate' ?
                              'Cross-border charging analysis for regional expansion planning and market penetration strategies.' :
                              showContext === 'request-rate' ?
                                'Real-time request processing metrics for system performance optimization and capacity planning.' :
                                'Detailed information about this variable and its impact on the charging station optimization model.'
                    }
                  </p>
                </div>
              )}

              {/* Collapsible Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="collapsible-section">
                  <span>Primary Variables</span>
                  <ChevronDown size={16} />
                </button>

                <button className="collapsible-section">
                  <span>Secondary Variables</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App