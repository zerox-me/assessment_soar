# Soar Task - Financial Management Dashboard

This project is a user-friendly financial management dashboard application that allows users to manage various financial information including transactions, account details, investments, credit cards, and loans in one place. The application should have responsive design and functionality as shown in the provided [Figma Link](https://www.figma.com/design/Lf57jfEvFsQjNZdQi07qyv/Soar-Front-End-Dev-Task?node-id=0-1&t=Peh4DOcavX88B4up-1).

## Key Features

- 📊 Dashboard: Summary of key financial information
- 💳 Transaction Management
- 🏦 Account Information
- 📈 Investment Portfolio Management
- 💳 Credit Card Management
- 💰 Loan Information
- 🛠️ Financial Services
- 👑 Privileges Management
- ⚙️ Settings

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Charts**: Chart.js
- **Routing**: React Router DOM
- **UI Components**: 
  - Radix UI
  - Lucide React
  - React Icons
- **HTTP Client**: Axios

## Implemented Features

### Loading States
- **Skeleton Loading**: Implemented skeleton loading states for better user experience during data fetching
  - Dashboard cards
  - Transaction lists
  - Account information
  - Investment portfolio

### Mock API
- **Axios Mock Adapter**: 
  - Simulated API endpoints for development
  - Mock data for all major features
  - Configurable response delays
  - Error simulation capabilities

### UI Components
- **Carousel Implementation**:
  - Shadcn/UI Carousel component integration
  - Smooth animations and transitions
  - Touch-friendly swipe gestures
  - Responsive design for all screen sizes

### State Management
- **Context API**:
  - User preferences
  - User avatar on Header components

## Getting Started

### Prerequisites

- Node.js 16.0.0 or higher
- npm 7.0.0 or higher

### Installation

```bash
# Clone the project
git clone [https://github.com/zerox-me/assessment_soar.git]

# Navigate to project directory
cd assessment_soar

# Install dependencies
npm install
```

### Development Server

```bash
npm start
```

The development server will run at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## Docker Support

You can run the application using Docker:

```bash
# Build Docker image
docker build -t soar-task .

# Run with Docker Compose
docker-compose up
```

The development server will run at [http://localhost](http://localhost).


## Project Structure

```
src/
├── components
      ├──common         # Reusable components
      ├──layouts        # Layout components
      ├──home           # Components used in Home page
      ├──lib            # Components for ShadCN/UI
      ├──settings       # Components used in Settings page
├── context/            # User context and provider
├── mock/               # Mock endpoints, types and mock data
├── pages/              # Page components
```