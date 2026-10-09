import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import LandingPage from "../pages/LandingPage/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import ClassroomDetails from "../pages/Classroom/ClassroomDetails";
import Tasks from "../pages/Tasks/Tasks";
import Profile from "../pages/Profile/Profile";
import Classroom from "../pages/Classroom/Classroom";
import Calendar from "../pages/Calender/Calender";
import Materials from "../pages/Materials/Materials";
import Leaderboard from "../pages/Leaderboard/Leaderboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

       <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classroom"
          element={
            <ProtectedRoute>
              <Classroom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/materials"
          element={
            <ProtectedRoute>
              <Materials />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classroom/:id"
          element={
            <ProtectedRoute>
              <ClassroomDetails />
            </ProtectedRoute>
          }
        />
       <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
            <Leaderboard />
              </ProtectedRoute>
          }
        /> 


      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;