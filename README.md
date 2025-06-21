# AnswersAI Data Visualization Platform

**Note**: This project was developed with assistance from Claude AI for code implementation, documentation, and technical guidance.

## Project Overview

This is a take-home assessment project for AnswersAI, implementing a data visualization platform with three key screens and interactive behaviors as specified in the Figma designs.

## Features Implemented

### ✅ Completed (Time: ~3 hours)
- **Dashboard Screen**: Main layout with sidebar navigation, header, and content areas
- **Basic UI Components**: Buttons, cards, and layout structure matching Figma designs
- **Slide-over Panel**: Edit Variables panel that slides in from the right with backdrop overlay
- **Interactive Line Chart**: Fully functional chart with Recharts library
- **Hover Tooltips**: Data point hover interactions with styled tooltips
- **Variable Selection Interface**: Working tag-based variable selection with toggle functionality
- **Context Panels**: 1.5s hover delay context information panels for all variables
- **Multiple Variable Categories**: 3 categories with 6 total interactive variables
- **Search Functionality**: Variable search input (UI ready)
- **Responsive Layout**: Grid-based layout for charts and KPI cards
- **Dark Theme**: Proper color scheme matching design specifications
- **Best Scenario Results**: Expandable cards with green accent styling
- **KPI Cards**: Four metric cards with proper styling and layout

### 📋 Remaining (Assessment Requirements)
- Firebase Authentication setup
- React Router navigation
- State management optimization (Zustand)
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
- **Context Panels**: Hover over variable tags for 1.5 seconds to see detailed information
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

### Single Component Approach
- **Decision**: Started with everything in App.tsx
- **Reason**: Faster development and immediate visual results
- **Trade-off**: Less organized code structure initially
- **Future**: Will refactor into proper component architecture

### State Management
- **Current**: Using React useState for basic interactions
- **Planned**: Zustand for complex state when adding authentication and routing

## Development Progress

### Session 1 (~1 hour)
- Project setup and Git repository creation
- Basic React + TypeScript + Vite configuration
- Dashboard layout implementation
- Slide-over panel functionality
- Initial styling to match Figma designs

### Session 2 (~30 minutes)
- Interactive chart implementation with Recharts
- Hover tooltip functionality
- Chart styling and responsive design

### Session 3 (~30 minutes)
- Variable selection interface implementation
- Tag-based interaction with toggle functionality
- Search input integration

### Session 4 (~1 hour)
- Context panels with 1.5s hover delay implementation
- Multiple variable categories (3 categories, 6 variables total)
- Complete hover interaction system
- Documentation updates

## Next Steps

1. **Firebase Authentication** - Set up authentication system with Google OAuth
2. **React Router** - Add navigation routing between screens
3. **State Management** - Implement Zustand for complex state management
4. **Code Organization** - Refactor into proper component structure
5. **Visual Polish** - Fine-tune styling to exactly match Figma designs

## Known Limitations

- No authentication system yet
- Navigation is visual only (no routing)
- No error handling or loading states
- Could benefit from component organization
- No mobile-specific optimizations

## Time Tracking

**Total Time Invested**: ~3 hours
- **Setup & Configuration**: ~30 minutes
- **Basic Layout & Styling**: ~45 minutes
- **Slide-over Implementation**: ~15 minutes
- **Interactive Chart Implementation**: ~30 minutes
- **Variable Selection Implementation**: ~30 minutes
- **Context Panels Implementation**: ~30 minutes

*Note: Times were approximate estimates based on development sessions, and were potentially inaccurate from previous commits*

## Assessment Requirements Status

### Required Screens
- [x] Dashboard Screen (complete with interactive elements)
- [x] Variable editing Slide-Over Card Screen (fully functional)
- [x] Details Screen (implemented as hover context panels)

### Required Interactions
- [x] Slide-Over Variable editing Card Interaction
- [x] Data Point Hover Interaction (chart tooltips)
- [x] Variable Selection Interaction (tags + context panels)

### Technical Requirements
- [x] React 18+ with TypeScript
- [ ] State management (basic useState implemented, Zustand planned)
- [ ] React Router (planned)
- [x] Styled-components or Tailwind CSS (using custom CSS)
- [ ] Firebase Authentication (planned)

## Development Approach

**AI-Assisted Development**: This project was built with guidance from Claude AI, which provided:
- Code implementation suggestions and debugging
- Step-by-step tutorials for complex features
- Architecture decisions and best practices
- Documentation and README generation

## Contact

For questions about this implementation:
- **Repository**: [GitHub Link](https://github.com/Amitesh-ux/AnswersAI)
- **Developer**: Amitesh