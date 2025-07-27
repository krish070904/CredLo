import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CibilScore = lazy(() => import("./pages/CibilScore"));
const AiChat = lazy(() => import("./pages/AiChat"));
const LoanEnquiry = lazy(() => import("./pages/LoanEnquiry"));
const LoanFinder = lazy(() => import("./pages/LoanFinder"));
const Profile = lazy(() => import("./pages/Profile"));
const TestAuth = lazy(() => import("./pages/TestAuth"));
const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cibil-score" element={<CibilScore />} />
          <Route path="/ai-chat" element={<AiChat />} />
          <Route path="/loan-finder" element={<LoanFinder />} />
          <Route path="/loan-enquiry" element={<LoanEnquiry />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test-auth" element={<TestAuth />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
export default App;
