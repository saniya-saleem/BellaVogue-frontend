import React from 'react'
import { Routes,Route } from 'react-router-dom'
import LoginPage from './Pages/Auth/LoginPage'
import Registration from './Pages/Auth/Registration'

const Approute = () => {
  return (
    <div>
       <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<Registration/>}/>
       </Routes>
    </div>
  )
}

export default Approute