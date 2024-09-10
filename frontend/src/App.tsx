
import './App.css'
import { Home } from './components/pages/home'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import AuthForm from './components/pages/auth'
function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthForm/>} />
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
