import axios from "axios";
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from './components/layouts/Layout';
import "./mock/mock";

// Lazy load all route components
const Home = lazy(() => import('./pages/Home'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Accounts = lazy(() => import('./pages/Accounts'));
const Investments = lazy(() => import('./pages/Investments'));
const CreditCards = lazy(() => import('./pages/CreditCards'));
const Loans = lazy(() => import('./pages/Loans'));
const Services = lazy(() => import('./pages/Services'));
const Privileges = lazy(() => import('./pages/Privileges'));
const Settings = lazy(() => import('./pages/Settings'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
   useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user");
        if (isMounted) {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/credit-cards" element={<CreditCards />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/services" element={<Services />} />
            <Route path="/privileges" element={<Privileges />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
