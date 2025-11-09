import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthCard } from './components/common/AuthCard'
import { LoginForm } from './components/auth/LoginForm'
import { RegisterForm } from './components/auth/RegisterForm'
import Home from './app/pages/Home'
import Messages from './app/pages/Messages'
import Notifications from './app/pages/Notifications'
import Profile from './app/pages/Profile'
import Search from './app/pages/Search'
import PublicRoute from './components/routes/PublicRoute'
import ProtectedRoute from './components/routes/ProtectedRoute'
import ConfirmEmail from './components/auth/ConfirmEmail'
import ProtectedConfirmRoute from './components/routes/ProtectedConfirmRoute'
import ForgotPasswordReset from './components/auth/ForgotPasswordReset'
import ForgotPasswordInitiate from './components/auth/ForgotPasswordInitiate'
import ProtectedResetRoute from './components/routes/ProtectedResetRoute'
import UserProfileView from './app/pages/UserProfileView'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={
            <AuthCard>
              <LoginForm />
            </AuthCard>
          }
        />
        <Route
          path="/register"
          element={
            <AuthCard>
              <RegisterForm />
            </AuthCard>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthCard>
              <ForgotPasswordInitiate />
            </AuthCard>
          }
        />
      </Route>
      
      <Route element={<ProtectedConfirmRoute />}>
        <Route
          path="/confirm-email"
          element={
            <AuthCard>
              <ConfirmEmail />
            </AuthCard>
          }
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users/:userId" element={<UserProfileView />} />
        <Route path="/search" element={<Search />} />
      </Route>

      <Route element={<ProtectedResetRoute />}>
        <Route
          path="/reset-password"
          element={
            <AuthCard>
              <ForgotPasswordReset />
            </AuthCard>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
