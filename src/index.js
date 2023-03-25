import React from "react"
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './css/w3.css'
import Header from './pages/header'
import Navigation from './pages/navigation'
import Footer from './pages/footer'
import Dashboard from "./pages/dashboard"
import NoPage from "./pages/nopage"


function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="*" element={<NoPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)