import { useState } from 'react'
import './App.css'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Zap, BarChart3, Settings, Wrench, Search, RefreshCw, Upload, X, Plus, ChevronDown, Info } from 'lucide-react';

import { AuthProvider, useAuth } from './AuthContext';
import { Login } from './Login';

const mockData = [
  { month: 'Apr', value: 30000 },
  { month: 'May', value: 45000 },
  { month: 'Jun', value: 40000 },
  { month: 'Jul', value: 80000 },
  { month: 'Aug', value: 60000 },
  { month: 'Sep', value: 45000 },
  { month: 'Oct', value: 55000 }
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
  const [searchTerm, setSearchTerm] = useState('Carbon');
  const [selectedVariables, setSelectedVariables] = useState<string[]>(['co2-distribution', 'fleet-sizing']);
  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null);
  const [showContext, setShowContext] = useState<string | null>('co2-distribution');
  const [primaryVariablesOpen, setPrimaryVariablesOpen] = useState(true);
  const [secondaryVariablesOpen, setSecondaryVariablesOpen] = useState(true);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const handleVariableHover = (variableId: string) => {
    setHoveredVariable(variableId);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
    hoverTimer.current = setTimeout(() => {
      setShowContext(variableId);
    }, 500);
  };

  const handleVariableLeave = () => {
    setHoveredVariable(null);
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

  const toggleVariable = (variableId: string) => {
    if (selectedVariables.includes(variableId)) {
      setSelectedVariables(selectedVariables.filter(id => id !== variableId));
    } else {
      setSelectedVariables([...selectedVariables, variableId]);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex">
      {/* Sidebar */}
      <div className="w-12 bg-[#2a2a2a] flex flex-col items-center py-4 space-y-4">
        <button className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#3a3a3a] rounded">
          <Home size={18} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-[#9fef00] bg-[#3a3a3a] rounded">
          <Zap size={18} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-[#3a3a3a] rounded">
          <BarChart3 size={18} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-[#3a3a3a] rounded">
          <Wrench size={18} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-[#3a3a3a] rounded">
          <Settings size={18} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 bg-[#2a2a2a] flex items-center justify-between px-6 border-b border-[#3a3a3a]">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400">
              <div className="w-4 h-3 flex flex-col justify-between">
                <div className="w-4 h-0.5 bg-gray-400"></div>
                <div className="w-4 h-0.5 bg-gray-400"></div>
                <div className="w-4 h-0.5 bg-gray-400"></div>
              </div>
            </button>
            <nav className="flex items-center space-x-6 text-sm">
              <span className="text-white">Charging Stations</span>
              <span className="text-gray-400">Fleet Sizing</span>
              <span className="text-gray-400">Parking</span>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-[#3a3a3a] text-white pl-10 pr-4 py-2 rounded-md w-64 text-sm border border-[#4a4a4a] focus:outline-none focus:border-[#9fef00]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">{currentUser?.email}</span>
              <button 
                onClick={handleLogout}
                className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Zap className="text-[#9fef00]" size={24} />
              <h1 className="text-2xl font-semibold">Charging Station</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded-md text-sm">
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
              <button 
                onClick={() => setEditVariablesOpen(true)}
                className="px-4 py-2 bg-[#9fef00] hover:bg-[#8ee000] text-black rounded-md text-sm font-medium"
              >
                Edit Variables
              </button>
              <button className="p-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded-md">
                <Upload size={16} />
              </button>
            </div>
          </div>

          {/* Best Scenario Results */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#9fef00] rounded-full"></div>
                <h2 className="text-lg font-medium">Best Scenario Results</h2>
              </div>
              <button className="text-gray-400 hover:text-white">
                <ChevronDown size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 relative">
                <p className="text-sm text-gray-300">
                  The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.
                </p>
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </button>
              </div>
              
              <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 relative">
                <p className="text-sm text-gray-300">
                  The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.
                </p>
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Charts Section */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-medium mb-4">Graphs</h3>
              <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <select className="bg-[#3a3a3a] text-white border border-[#4a4a4a] rounded px-3 py-1 text-sm">
                      <option>Unsatisfied Demand %</option>
                    </select>
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888', fontSize: 12 }}
                        className="text-xs"
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888', fontSize: 12 }}
                        tickFormatter={(value) => `€${value / 1000}K`}
                        domain={[20000, 100000]}
                        ticks={[20000, 40000, 60000, 80000, 100000]}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#9fef00"
                        strokeWidth={2}
                        dot={{ fill: '#9fef00', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#9fef00', strokeWidth: 2, fill: '#9fef00' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#2a2a2a',
                          border: '1px solid #9fef00',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                        formatter={(value: any) => [`€${value.toLocaleString()}`, 'Value']}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* KPI Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Key Performance Indicators</h3>
                <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white">
                  <span>Variables</span>
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Infrastructure Units</h4>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <div className="text-2xl font-semibold mb-2">€421.07</div>
                  <p className="text-xs text-gray-400">This describes variable two and what the shown data means.</p>
                </div>

                <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Charging Growth</h4>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <div className="text-2xl font-semibold mb-2">33.07</div>
                  <p className="text-xs text-gray-400">This describes variable two and what the shown data means.</p>
                </div>

                <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Localization change</h4>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <div className="text-2xl font-semibold mb-2">21.9%</div>
                  <p className="text-xs text-gray-400">This describes variable two and what the shown data means.</p>
                </div>

                <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Fleet growth</h4>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <div className="text-2xl font-semibold mb-2">7.03%</div>
                  <p className="text-xs text-gray-400">This describes variable two and what the shown data means.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Variables Slide-over */}
      {editVariablesOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setEditVariablesOpen(false)}
          />
          
          {/* Slide-over Panel */}
          <div className="absolute right-0 top-0 h-full w-96 bg-[#2a2a2a] border-l border-[#3a3a3a] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#3a3a3a]">
              <h2 className="text-lg font-semibold">Edit Variables</h2>
              <button 
                onClick={() => setEditVariablesOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 h-full overflow-y-auto">
              {/* Search and Action Buttons */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search variables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#3a3a3a] text-white pl-10 pr-4 py-2 rounded-md text-sm border border-[#4a4a4a] focus:outline-none focus:border-[#9fef00]"
                  />
                </div>
                <button className="px-3 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white rounded-md text-sm border border-[#4a4a4a]">
                  AutoFill
                </button>
                <button className="px-3 py-2 bg-[#9fef00] hover:bg-[#8ee000] text-black rounded-md text-sm font-medium">
                  Rerun
                </button>
              </div>

              {/* Variable Categories */}
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Variable category 1</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleVariable('carbon-1')}
                      onMouseEnter={() => handleVariableHover('carbon-1')}
                      onMouseLeave={handleVariableLeave}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedVariables.includes('carbon-1')
                          ? 'bg-[#9fef00] text-black border-[#9fef00]'
                          : 'bg-[#3a3a3a] text-white border-[#4a4a4a] hover:border-[#9fef00]'
                      }`}
                    >
                      <span>Carbon 1</span>
                      <span>{selectedVariables.includes('carbon-1') ? '×' : '+'}</span>
                    </button>

                    <button
                      onClick={() => toggleVariable('co2-distribution')}
                      onMouseEnter={() => handleVariableHover('co2-distribution')}
                      onMouseLeave={handleVariableLeave}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedVariables.includes('co2-distribution')
                          ? 'bg-[#9fef00] text-black border-[#9fef00]'
                          : 'bg-[#3a3a3a] text-white border-[#4a4a4a] hover:border-[#9fef00]'
                      }`}
                    >
                      <span>Co2 Distribution</span>
                      <span>{selectedVariables.includes('co2-distribution') ? '×' : '+'}</span>
                    </button>

                    <button
                      onClick={() => toggleVariable('fleet-sizing')}
                      onMouseEnter={() => handleVariableHover('fleet-sizing')}
                      onMouseLeave={handleVariableLeave}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedVariables.includes('fleet-sizing')
                          ? 'bg-[#9fef00] text-black border-[#9fef00]'
                          : 'bg-[#3a3a3a] text-white border-[#4a4a4a] hover:border-[#9fef00]'
                      }`}
                    >
                      <span>Fleet sizing</span>
                      <span>{selectedVariables.includes('fleet-sizing') ? '×' : '+'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Variable Category 2</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleVariable('parking-rate')}
                      onMouseEnter={() => handleVariableHover('parking-rate')}
                      onMouseLeave={handleVariableLeave}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedVariables.includes('parking-rate')
                          ? 'bg-[#9fef00] text-black border-[#9fef00]'
                          : 'bg-[#3a3a3a] text-white border-[#4a4a4a] hover:border-[#9fef00]'
                      }`}
                    >
                      <span>Parking Rate</span>
                      <span>{selectedVariables.includes('parking-rate') ? '×' : '+'}</span>
                    </button>

                    <button
                      onClick={() => toggleVariable('border-rate')}
                      onMouseEnter={() => handleVariableHover('border-rate')}
                      onMouseLeave={handleVariableLeave}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedVariables.includes('border-rate')
                          ? 'bg-[#9fef00] text-black border-[#9fef00]'
                          : 'bg-[#3a3a3a] text-white border-[#4a4a4a] hover:border-[#9fef00]'
                      }`}
                    >
                      <span>Border Rate</span>
                      <span>{selectedVariables.includes('border-rate') ? '×' : '+'}</span>
                    </button>

                    <button
                      onClick={() => toggleVariable('request-rate')}
                      onMouseEnter={() => handleVariableHover('request-rate')}
                      onMouseLeave={handleVariableLeave}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedVariables.includes('request-rate')
                          ? 'bg-[#9fef00] text-black border-[#9fef00]'
                          : 'bg-[#3a3a3a] text-white border-[#4a4a4a] hover:border-[#9fef00]'
                      }`}
                    >
                      <span>Request rate</span>
                      <span>{selectedVariables.includes('request-rate') ? '×' : '+'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Variable Category 3</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleVariable('variable-3a')}
                      onMouseEnter={() => handleVariableHover('variable-3a')}
                      onMouseLeave={handleVariableLeave}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedVariables.includes('variable-3a')
                          ? 'bg-[#9fef00] text-black border-[#9fef00]'
                          : 'bg-[#3a3a3a] text-white border-[#4a4a4a] hover:border-[#9fef00]'
                      }`}
                    >
                      <span>Variable 1</span>
                      <span>{selectedVariables.includes('variable-3a') ? '×' : '+'}</span>
                    </button>

                    <button
                      onClick={() => toggleVariable('variable-3b')}
                      onMouseEnter={() => handleVariableHover('variable-3b')}
                      onMouseLeave={handleVariableLeave}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedVariables.includes('variable-3b')
                          ? 'bg-[#9fef00] text-black border-[#9fef00]'
                          : 'bg-[#3a3a3a] text-white border-[#4a4a4a] hover:border-[#9fef00]'
                      }`}
                    >
                      <span>Variable 1</span>
                      <span>{selectedVariables.includes('variable-3b') ? '×' : '+'}</span>
                    </button>

                    <button
                      onClick={() => toggleVariable('variable-3c')}
                      onMouseEnter={() => handleVariableHover('variable-3c')}
                      onMouseLeave={handleVariableLeave}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedVariables.includes('variable-3c')
                          ? 'bg-[#9fef00] text-black border-[#9fef00]'
                          : 'bg-[#3a3a3a] text-white border-[#4a4a4a] hover:border-[#9fef00]'
                      }`}
                    >
                      <span>Variable 1</span>
                      <span>{selectedVariables.includes('variable-3c') ? '×' : '+'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Variable Details */}
              {showContext === 'co2-distribution' && (
                <div className="bg-[#3a3a3a] border border-[#4a4a4a] rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <h4 className="font-medium">Co2 Distribution</h4>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people of all ages. Whether you're a student, a professional, or a senior citizen, Switch adapts to your needs and lifestyle.
                  </p>
                </div>
              )}

              {/* Collapsible Sections */}
              <div className="space-y-3">
                <button
                  onClick={() => setPrimaryVariablesOpen(!primaryVariablesOpen)}
                  className="w-full flex items-center justify-between bg-[#3a3a3a] hover:bg-[#4a4a4a] px-4 py-3 rounded-lg text-sm font-medium"
                >
                  <span>Primary Variables</span>
                  <ChevronDown size={16} className={`transform transition-transform ${primaryVariablesOpen ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={() => setSecondaryVariablesOpen(!secondaryVariablesOpen)}
                  className="w-full flex items-center justify-between bg-[#3a3a3a] hover:bg-[#4a4a4a] px-4 py-3 rounded-lg text-sm font-medium"
                >
                  <span>Secondary Variables</span>
                  <ChevronDown size={16} className={`transform transition-transform ${secondaryVariablesOpen ? 'rotate-180' : ''}`} />
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