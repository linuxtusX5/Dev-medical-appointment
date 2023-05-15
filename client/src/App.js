import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import NavBar from './components/NavBar';
import AdminHome from './pages/admin/AdminHome';
import {User, Profile, Security} from './pages/admin/AdminHome';
import ClientAppointment from './pages/admin/ClientAppointment';
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";

export default function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
        {loading ? (
          <Spinner />
        ) : (
      <Routes>
        <Route path='/'
        element={
          <ProtectedRoute>
            <NavBar/>
          </ProtectedRoute>
        }/>
        <Route path='/login'
        element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>
        <Route path='/register'
        element={
          <PublicRoute>
            <Register/>
          </PublicRoute>
        }/>
        <Route path='/appointment'
        element={
          <ProtectedRoute>
            <Appointments/>
          </ProtectedRoute>
        }/>
        <Route path='/admin-dashboard'
        element={
          <ProtectedRoute>
            <AdminHome/>
          </ProtectedRoute>
        }/>
        <Route path='/user'
        element={
          <ProtectedRoute>
            <User/>
          </ProtectedRoute>
        }/>
        <Route path='/profile'
        element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>
        <Route path='/security'
        element={
          <ProtectedRoute>
            <Security/>
          </ProtectedRoute>
        }/>
        <Route path='/client-appointment'
        element={
          <ProtectedRoute>
            <ClientAppointment/>
          </ProtectedRoute>
        }/>
      </Routes>
        )}
    </>
  )
}
