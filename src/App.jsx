import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Content from './frontend/component/content'
import Header from './frontend/component/Header'
import { ThemeProvider } from './frontend/component/ThemeProvider';
import Algo_page from './frontend/component/Algo_page'

function App() {


  return (
  
      <ThemeProvider>
        <Header />
        <Routes>  
          <Route path='/' element={<Content />} />
          <Route path='/algo/:id' element={<Algo_page/>}></Route>
        </Routes>
      </ThemeProvider>
    
  )
}

export default App
