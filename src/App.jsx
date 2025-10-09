import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AuthCard } from './components/AuthCard'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
    </Routes>
  )
}

export default App
