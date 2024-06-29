import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './component/Home';
import Navbar from './component/Navbar';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
  
    <Navbar/>
    
    <Routes>
    <Route path="/" element={<Home/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
