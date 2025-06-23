# AnswersAI Data Visualization Platform

A data visualization dashboard built for the AnswersAI take-home assessment. Implements three key screens with interactive behaviors as specified in the provided Figma designs.

**Development Note**: While I wrote all the code myself, I used Claude AI for debugging assistance, architecture guidance, documentation, commenting, and help throughout the development process with unfamiliar concepts such as Firebase configuration.

## Features

- **Dashboard** with interactive line chart and KPI cards
- **Variable editing** slide-over panel with search and selection
- **Chart tooltips** showing detailed data point information
- **Firebase authentication** with Google OAuth and email/password
- **React Router** navigation between dashboard sections
- **Responsive design** matching the provided designs

## Tech Stack

- React 18 + TypeScript
- Vite for build tooling
- Recharts for data visualization
- Firebase for authentication
- React Router for navigation
- Custom CSS for styling
- Lucide React for icons

## Setup Instructions

1. Clone and install dependencies:
```bash
git clone https://github.com/Amitesh-ux/AnswersAI.git
cd AnswersAI/data-viz-platform
npm install
```

2. **Environment Variables**: Create a Firebase project and enable Authentication (Google + Email/Password providers)

3. Add your Firebase configuration to `src/firebase-config.js`:
```javascript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── App.tsx              # Main app with routing
├── App.css              # Styles
├── AuthContext.tsx      # Authentication context
├── Login.tsx            # Login component
├── NewHoverDetails.tsx  # Custom chart tooltip
└── main.tsx             # Entry point
```

## Features Implemented

- **Dashboard Screen**: Interactive line chart with KPI cards and responsive layout
- **Variable Editing Slide-over**: Overlay panel with search, variable categories, and selection states  
- **Data Point Details**: Custom chart tooltips with contextual insights on hover
- **Authentication System**: Firebase auth with Google OAuth and email/password login
- **Navigation**: React Router implementation with protected routes
- **Interactive Elements**: Variable tag selection, context panels, smooth animations
- **Responsive Design**: Mobile and desktop layouts matching Figma specifications

## Technical Decisions and Trade-offs

**Custom CSS over Tailwind**: Chose custom CSS for precise Figma design matching. Trade-off was more verbose code but exact visual fidelity.

**Recharts for Visualization**: Used established charting library for reliability and built-in interactions. Trade-off was additional dependency vs custom SVG implementation.

**Firebase Authentication**: Implemented real authentication instead of mock system for production-like experience. Added setup complexity but provides realistic user flows.

**Context API for State**: Used React Context for authentication state, local state for UI interactions. Simple approach suitable for app scale.

## Known Limitations

- No unit tests implemented due to time constraints
- Error handling could be more comprehensive  
- Mobile experience could use gesture-specific optimizations
- Chart animation could be smoother on data updates

## Time Spent

**Total**: Approximately 6 hours
- Core functionality and layout: 4 hours
- Firebase authentication setup: 1 hour
- Polish, styling, and documentation: 1 hour

## Requirements Met

- ✅ Dashboard screen with data visualization
- ✅ Slide-over variable editing panel
- ✅ Data point hover details
- ✅ React 18+ with TypeScript
- ✅ State management and routing
- ✅ Firebase authentication

## Security Notes

- **API Key Rotation**: An API key was accidentally committed early in development and has been rotated. All current keys are properly secured and not exposed in the codebase.