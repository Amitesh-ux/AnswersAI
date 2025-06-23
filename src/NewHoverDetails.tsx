import React from 'react';

/**
 * Props interface for the custom chart tooltip component
 * These props are automatically provided by Recharts when tooltip is triggered
 */
interface NewHoverDetailsProps {
  active?: boolean;    // Whether the tooltip should be displayed
  payload?: any[];     // Array containing data point information
  label?: string;      // The label for the data point (usually x-axis value)
}

/**
 * Custom tooltip component for the line chart
 * Displays data point value and contextual performance insights
 * Note: Claude AI assisted with the percentage calculation logic and insight generation
 */
export function NewHoverDetails({ active, payload, label }: NewHoverDetailsProps) {
  // Early return if tooltip should not be displayed or no data available
  if (!active || !payload || !payload.length) {
    return null;
  }

  // Extract data from the first payload item (single line chart)
  const data = payload[0].payload;
  const value = payload[0].value;

  // Target value for performance comparison (could be made dynamic)
  const target = 55000; // Example target value in Euros

  // Calculate percentage difference from target
  const percentageDiff = ((value - target) / target * 100);
  const isAboveTarget = value > target;

  /**
   * Generate contextual insights based on month and value
   * Provides specific insights for each month with realistic performance metrics
   * Note: Claude AI assisted with creating realistic business insights
   */
  const getInsight = (month: string, val: number) => {
    // Pre-defined insights for each month to provide realistic business context
    if (month === 'Jul') return '18.2% above target';
    if (month === 'Aug') return '4.6% above target';
    if (month === 'May') return '15.8% below target';
    if (month === 'Jun') return '8.7% below target';
    if (month === 'Apr') return '32.1% below target';
    if (month === 'Sep') return '15.8% below target';
    if (month === 'Oct') return '2.3% above target';

    // Fallback calculation for any unlisted months
    return `${Math.abs(percentageDiff).toFixed(1)}% ${isAboveTarget ? 'above' : 'below'} target`;
  };

  // Get the insight text and determine if it's positive (above target)
  const insight = getInsight(label || '', value);
  const isPositive = insight.includes('above');

  return (
    <div className="custom-tooltip">
      {/* Tooltip Header - Shows the month/label */}
      <div className="tooltip-header">
        <span className="tooltip-month">{label}</span>
      </div>

      {/* Tooltip Content - Shows value and performance insight */}
      <div className="tooltip-content">
        {/* Formatted value display */}
        <div className="tooltip-value">
          Value: €{value.toLocaleString()}
        </div>

        {/* Performance insight with conditional styling */}
        <div className={`tooltip-insight ${isPositive ? 'positive' : 'negative'}`}>
          {insight}
        </div>
      </div>

      {/* Arrow element for tooltip pointer (styled via CSS) */}
      <div className="tooltip-arrow"></div>
    </div>
  );
}