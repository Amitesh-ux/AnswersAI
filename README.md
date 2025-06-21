# AnswersAI Data Visualization Platform

A React TypeScript application implementing a charging station data visualization dashboard with interactive components.

## Project Overview

This is a take-home assessment project for AnswersAI, implementing a data visualization platform with three key screens and interactive behaviors as specified in the Figma designs.

## Features Implemented

### ✅ Completed (Time: ~2 hours)
- **Dashboard Screen**: Main layout with sidebar navigation, header, and content areas
- **Basic UI Components**: Buttons, cards, and layout structure matching Figma designs
- **Slide-over Panel**: Edit Variables panel that slides in from the right with backdrop overlay
- **Interactive Line Chart**: Fully functional chart with Recharts library
- **Hover Tooltips**: Data point hover interactions with styled tooltips
- **Responsive Layout**: Grid-based layout for charts and KPI cards
- **Dark Theme**: Proper color scheme matching design specifications
- **Best Scenario Results**: Expandable cards with green accent styling
- **KPI Cards**: Four metric cards with proper styling and layout

### 🚧 In Progress
- Variable selection with tag-based interface
- Context panels with 1.5s hover delay
- State management for variable interactions

### 📋 Planned
- Firebase Authentication setup
- React Router navigation
- Variable state management
- Mobile responsive optimizations
- Error handling and loading states

## Tech Stack

- **React 18+** with TypeScript
- **Vite** for build tooling
- **Recharts** for interactive data visualization
- **CSS3** for styling (custom CSS instead of Tailwind)
- **React Hooks** for state management
- Planned: Zustand for complex state, React Router, Firebase Auth

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Global styles and component styling
├── main.tsx         # React entry point
└── index.css        # Base styles and CSS reset
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Amitesh-ux/AnswersAI.git
cd AnswersAI/data-viz-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Current Functionality

- **Navigation**: Sidebar with icon-based navigation (visual only)
- **Dashboard Layout**: Proper grid layout matching Figma designs
- **Interactive Chart**: Line chart with hover tooltips showing data values
- **Variable Selection**: Click tags to select/deselect variables with visual feedback
- **Edit Variables**: Click "Edit Variables" button to open slide-over panel
- **Responsive Design**: Adapts to different screen sizes
- **Interactive Elements**: Hover states on buttons, navigation, and chart data points

## Technical Decisions & Trade-offs

### CSS over Tailwind
- **Decision**: Used custom CSS instead of Tailwind CSS
- **Reason**: Encountered configuration issues with Tailwind + Vite setup
- **Trade-off**: More verbose styling code, but full control over styles
- **Future**: Can migrate to Tailwind later if needed

### Recharts Integration
- **Decision**: Used Recharts library for chart implementation
- **Reason**: Faster development than custom SVG, professional results, built-in interactions
- **Trade-off**: Additional dependency vs full custom control
- **Result**: Clean, responsive chart with minimal code
- **Decision**: Started with everything in App.tsx
- **Reason**: Faster development and immediate visual results
- **Trade-off**: Less organized code structure initially
- **Future**: Will refactor into proper component architecture

### Single Component Approach
- **Decision**: Started with everything in App.tsx
- **Reason**: Faster development and immediate visual results
- **Trade-off**: Less organized code structure initially
- **Future**: Will refactor into proper component architecture

### State Management
- **Current**: Using React useState for basic interactions
- **Planned**: Zustand for complex state when adding variable selection logic

## Development Progress

### Session 1 (1.5 hours)
- Project setup and Git repository creation
- Basic React + TypeScript + Vite configuration
- Dashboard layout implementation
- Slide-over panel functionality
- Styling to match Figma designs

### Session 2 (0.5 hours)
- Interactive chart implementation with Recharts
- Hover tooltip functionality
- Chart styling and responsive design
- Documentation updates

### Session 3 (0.5 hours)
- Variable selection interface implementation
- Tag-based interaction with toggle functionality
- Search input integration
- State management for variable selection

## Next Steps
1. **Additional Variable Categories** - Expand variable selection to match full Figma design
2. **Context Panels** - Add 1.5s hover delay context information panels
4. **Authentication Setup** - Set up Firebase authentication
5. **Routing** - Add React Router for navigation
6. **Code Organization** - Refactor into proper component structure

## Known Limitations

- Additional variable categories need implementation
- No authentication system
- Navigation is visual only (no routing)
- No error handling or loading states
- Context panels not yet implemented

## Time Tracking

- **Total Time Invested**: ~3.75 hours so far
- **Setup & Configuration**: 45 minutes
- **Basic Layout & Styling**: 60 minutes
- **Slide-over Implementation**: 30 minutes
- **Interactive Chart Implementation**: 45 minutes
- **Variable Selection Implementation**: 45 minutes

## Assessment Requirements Status

### Required Screens
- [x] Dashboard Screen (basic layout complete)
- [x] Variable editing Slide-Over Card Screen (functional)
- [ ] Details Screen (hover tooltips - planned)

### Required Interactions
- [x] Slide-Over Variable editing Card Interaction
- [x] Data Point Hover Interaction
- [x] Variable Selection Interaction

### Technical Requirements
- [x] React 18+ with TypeScript
- [ ] State management (Zustand planned)
- [ ] React Router (planned)
- [x] Styled-components or Tailwind CSS (using custom CSS)
- [ ] Firebase Authentication (planned)

---

*This project is part of the AnswersAI Frontend Engineer take-home assessment.*

For questions about this implementation:
- **Repository**: [GitHub Link](https://github.com/Amitesh-ux/AnswersAI)
- **Developer**: Amitesh Schar

## Development Approach

**AI-Assisted Development**: This project was built with guidance from Claude AI, which provided:
- Code implementation suggestions and debugging
- Step-by-step tutorials for complex features
- Architecture decisions and best practices
- Documentation and README generation