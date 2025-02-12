
import './App.css'
import { Home } from './components/pages/home'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import BatchDashboard from './components/pages/group'
import { CreateGroup } from './components/layouts/create-group'
import GoogleSignIn from './components/GoogleSignIn'
import UploadNotes from './components/layouts/UploadNotes'
function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<GoogleSignIn />} />
      <Route path=':userId/create/group' element={<CreateGroup/>} />
      <Route path="/group/:group_id" element={<BatchDashboard/>} />
      <Route path='/notes' element={<UploadNotes/>} />
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
