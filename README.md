# AnswersAI Data Visualization Platform (Generated with the help of Claude)

A React TypeScript application implementing a charging station data visualization dashboard with interactive components.

## Project Overview

This is a take-home assessment project for AnswersAI, implementing a data visualization platform with three key screens and interactive behaviors as specified in the Figma designs.

## Features Implemented

### ✅ Completed (Time: ~1.5 hours)
- **Dashboard Screen**: Main layout with sidebar navigation, header, and content areas
- **Basic UI Components**: Buttons, cards, and layout structure matching Figma designs
- **Slide-over Panel**: Edit Variables panel that slides in from the right with backdrop overlay
- **Responsive Layout**: Grid-based layout for charts and KPI cards
- **Dark Theme**: Proper color scheme matching design specifications
- **Best Scenario Results**: Expandable cards with green accent styling
- **KPI Cards**: Four metric cards with proper styling and layout

### 🚧 In Progress
- Interactive line chart with hover tooltips
- Variable selection with tag-based interface
- Context panels with 1.5s hover delay
- Data point hover interactions

### 📋 Planned
- Firebase Authentication setup
- React Router navigation
- Variable state management
- Mobile responsive optimizations
- Error handling and loading states

## Tech Stack

- **React 18+** with TypeScript
- **Vite** for build tooling
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
- **Edit Variables**: Click "Edit Variables" button to open slide-over panel
- **Responsive Design**: Adapts to different screen sizes
- **Interactive Elements**: Hover states on buttons and navigation items

## Technical Decisions & Trade-offs

### CSS over Tailwind
- **Decision**: Used custom CSS instead of Tailwind CSS
- **Reason**: Encountered configuration issues with Tailwind + Vite setup
- **Trade-off**: More verbose styling code, but full control over styles
- **Future**: Can migrate to Tailwind later if needed

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

## Next Steps

1. **Interactive Chart**: Implement line chart with SVG and hover tooltips
2. **Variable Selection**: Build tag-based variable selection interface
3. **Context Panels**: Add 1.5s hover delay context information panels
4. **State Management**: Implement Zustand for variable selection state
5. **Authentication**: Set up Firebase authentication
6. **Routing**: Add React Router for navigation
7. **Code Organization**: Refactor into proper component structure

## Known Limitations

- Chart is currently a placeholder
- Variable selection interface not yet implemented
- No authentication system
- Navigation is visual only (no routing)
- No error handling or loading states

## Time Tracking

- **Total Time Invested**: ~1.5 hours
- **Setup & Configuration**: 30 minutes
- **Basic Layout & Styling**: 45 minutes
- **Slide-over Implementation**: 15 minutes

## Assessment Requirements Status

### Required Screens
- [x] Dashboard Screen (basic layout complete)
- [x] Variable editing Slide-Over Card Screen (functional)
- [ ] Details Screen (hover tooltips - planned)

### Required Interactions
- [x] Slide-Over Variable editing Card Interaction
- [ ] Data Point Hover Interaction
- [ ] Variable Selection Interaction

### Technical Requirements
- [x] React 18+ with TypeScript
- [ ] State management (Zustand planned)
- [ ] React Router (planned)
- [x] Styled-components or Tailwind CSS (using custom CSS)
- [ ] Firebase Authentication (planned)

## Contact

For questions about this implementation:
- **Repository**: [GitHub Link](https://github.com/Amitesh-ux/AnswersAI)
- **Developer**: Amitesh

---

*This project is part of the AnswersAI Frontend Engineer take-home assessment.*