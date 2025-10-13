import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AuthCard } from './components/AuthCard'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import Welcome from './app/pages/Welcome'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'
import ConfirmEmail from './app/pages/ConfirmEmail'
import ProtectedConfirmRoute from './components/ProtectedConfirmRoute'
import ForgotPasswordReset from './components/ForgotPasswordReset'
import ForgotPasswordInitiate from './components/ForgotPasswordInitiate'
import ProtectedResetRoute from './components/ProtectedResetRoute'

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
        <Route path="/welcome" element={<Welcome />} />
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
