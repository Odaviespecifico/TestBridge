import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import {  Header,  Instruction,  Introduction,  Footer,  Loading,} from "./utils.jsx";
import { RegisterAttempt } from './questions.jsx';
import Linguaskill from './Linguaskill.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index path='/test' element={<Linguaskill/>}>
      
      </Route>
      <Route path='/' element={<RegisterAttempt/>}/>
    </Routes>
  </BrowserRouter>
)
