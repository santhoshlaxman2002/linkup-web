import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AuthCard } from './components/AuthCard'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import Welcome from './app/pages/Welcome'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'

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
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/welcome" element={<Welcome />} />
      </Route>
    </Routes>
  )
}

export default App
