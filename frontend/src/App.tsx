
import './App.css'
import { Home } from './components/pages/home'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import AuthForm from './components/layouts/auth'
import BatchDashboard from './components/pages/group'
import { CreateGroup } from './components/layouts/create-group'
function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthForm/>} />
      <Route path='/create/group' element={<CreateGroup/>} />
      <Route path="/group/:group_id" element={<BatchDashboard/>} />
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
